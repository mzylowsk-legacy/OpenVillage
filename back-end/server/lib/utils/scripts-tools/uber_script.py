import argparse
import datetime
import os
import shutil
import subprocess
import time
import urlparse
import ntpath

from pymongo import MongoClient

STATUSES = {
    'SUCCESS': 0,
    'FAIL': 1,
    'WAITING': 777,
    'DURING': 888,
    'IGNORED': 999
}

INITIAL_STEPS_NAMES = {
    'CLONE': 'Clone repository',
    'SET_VERSION': 'Setting project version'
}

status_codes = []


def are_previous_steps_failed():
    return False if not sum(status_codes) else True


def download_repository(workspace, project_name, url, username, password, build_name, mongo_client):
    print('Cloning repository {}'.format(project_name))
    order = 0
    try:
        if username and password:
            parsed_url = urlparse.urlsplit(url)
            output = subprocess.check_output(
                ['git', 'clone', 'https://{}:{}@{}{}'.format(username, password, parsed_url.netloc, parsed_url.path)],
                cwd=workspace)
        else:
            output = subprocess.check_output(['git', 'clone', url, project_name], cwd=workspace)

        print(output)
        status_codes.append(STATUSES['SUCCESS'])
        update_build_step_in_database(build_name, order, output, status_codes[-1], mongo_client)
    except subprocess.CalledProcessError as e:
        print('Error in downloading repository: {}'.format(e.output))
        status_codes.append(e.returncode)
        update_build_step_in_database(build_name, order, e.output, status_codes[-1], mongo_client)


def set_repository_version(workspace, project_name, version, build_name, mongo_client):
    order = 1
    if are_previous_steps_failed():
        print('Skipping due to previous step failed')
        status_codes.append(STATUSES['IGNORED'])
        return

    print('Setting "{}" version for {} project'.format(version, project_name))
    repo_dir = os.path.join(workspace, project_name)
    try:
        output = subprocess.check_output(['git', 'checkout', version], cwd=repo_dir)
        print(output)
        status_codes.append(STATUSES['SUCCESS'])
        update_build_step_in_database(build_name, order, output, status_codes[-1], mongo_client)
    except subprocess.CalledProcessError as e:
        print('Cannot set version: {}'.format(e.output))
        status_codes.append(e.returncode)
        update_build_step_in_database(build_name, order, e.output, status_codes[-1], mongo_client)


def run_build_steps(workspace, project_name, build_steps_list, build_name, mongo_client):
    print('Running specified build steps')
    order = 1
    repo_dir = os.path.join(workspace, project_name)
    for command in build_steps_list:
        order = order + 1
        if are_previous_steps_failed():
            print('Skipping due to previous step failed')
            status_codes.append(STATUSES['IGNORED'])
            update_build_step_in_database(build_name, order, '', status_codes[-1], mongo_client)
            continue
        print('Running step: {}'.format(command))
        try:
            command = command.replace('\"', '')
            print(command.split())
            output = subprocess.check_output(command.split(), cwd=repo_dir)
            print(output)
            status_codes.append(STATUSES['SUCCESS'])
            update_build_step_in_database(build_name, order, output, status_codes[-1], mongo_client)
        except subprocess.CalledProcessError as e:
            print('Cannot perform build step {}'.format(command))
            status_codes.append(e.returncode)
            update_build_step_in_database(build_name, order, e.output, status_codes[-1], mongo_client)
        except Exception as e:
            print('Cannot perform build step {}: {}'.format(command, e))
            status_codes.append(STATUSES['FAIL'])
            update_build_step_in_database(build_name, order, str(e), status_codes[-1], mongo_client)


def delete_repository_dir(workspace, project_name):
    print('Cleaning workspace after finishing build')
    shutil.rmtree(os.path.join(workspace, project_name), ignore_errors=True)


def insert_record_to_database(record_data, mongo_client):
    mongo_client.insert_one(record_data)


def update_build_step_in_database(build_name, order, build_log, build_status, mongo_client):
    mongo_client.update({'buildName': build_name, 'steps.order': order},
                        {'$set': {'steps.$.log': build_log, 'steps.$.status_code': build_status}})


def update_build_status(build_name, mongo_client):
    status = STATUSES['FAIL'] if are_previous_steps_failed() else STATUSES['SUCCESS']
    mongo_client.update({'buildName': build_name}, {'$set': {'status_code': status}})


def initialize_build(build_name, project_name, owner, project_version, build_steps, commitSHA, mongo_client):
    print('Initialization build')
    current_time = time.time()
    prerequisites_steps = [INITIAL_STEPS_NAMES['CLONE'], INITIAL_STEPS_NAMES['SET_VERSION']]
    steps = []
    summary_steps = prerequisites_steps + build_steps if build_steps else prerequisites_steps
    for ind, step in enumerate(summary_steps):
        if step.startswith('"') and step.endswith('"'):
            step = step[1:-1]
        steps.append(dict(
            status_code=STATUSES['WAITING'],
            log='',
            name=ntpath.basename(step),
            order=ind
        ))
    status_code = STATUSES['DURING']
    build_start_time = datetime.datetime.fromtimestamp(current_time)
    build_entity = dict(
        buildName=build_name,
        owner=owner,
        projectVersion=project_version,
        projectName=project_name,
        steps=steps,
        status_code=status_code,
        timestamp=str(build_start_time),
        commit_sha=commitSHA,
        isEmailSent=False
    )
    print('Adding initialize record to database: {}'.format(build_entity))
    insert_record_to_database(build_entity, mongo_client)
    return build_name


def get_mongo_client(mongo_host, mongo_port, mongo_database_name, mongo_collection):
    client = MongoClient(mongo_host, mongo_port)
    db = client[mongo_database_name]
    return db[mongo_collection]


def parse_args():
    parser = argparse.ArgumentParser(description='Downloads and builds project stored on Github')

    parser.add_argument('-x', '--build-name', required=True, help='Build name')
    parser.add_argument('-u', '--username', required=False, help='Github username')
    parser.add_argument('-p', '--password', required=False, help='Password for Github user')
    parser.add_argument('-o', '--project-owner', required=False, help='Project owner')
    parser.add_argument('-n', '--project-name', required=True, help='Project name')
    parser.add_argument('-v', '--project-version', required=True, help='Project version')
    parser.add_argument('-s', '--build-steps', required=False, default=[], action='append', help='Steps to execute in building process')
    parser.add_argument('-g', '--github-url', required=True, help='Url to Github repository')
    parser.add_argument('-d', '--destination', required=True, help='Destination workdir')
    parser.add_argument('-z', '--mongo-host', required=True, help='MongoDb host')
    parser.add_argument('-m', '--mongo-port', required=True, type=int, help='MongoDb port')
    parser.add_argument('-a', '--mongo-database-name', required=True, help='MongoDb database name')
    parser.add_argument('-c', '--mongo-collection-name', required=True, help='MongoDb collection name')
    parser.add_argument('-t', '--commitSHA', required=True, help='GitHub head commit sha')

    return parser.parse_args()


def main():
    args = parse_args()

    mongo_client = get_mongo_client(args.mongo_host, args.mongo_port, args.mongo_database_name,
                                    args.mongo_collection_name)

    build_name = args.build_name

    initialize_build(build_name, args.project_name, args.project_owner, args.project_version, args.build_steps, args.commitSHA, mongo_client)

    if not os.path.exists(args.destination):
        os.makedirs(args.destination)
    download_repository(args.destination, args.project_name, args.github_url, args.username, args.password, build_name,
                        mongo_client)
    set_repository_version(args.destination, args.project_name, args.project_version, build_name, mongo_client)
    run_build_steps(args.destination, args.project_name, args.build_steps, build_name, mongo_client)
    update_build_status(build_name, mongo_client)
    delete_repository_dir(args.destination, args.project_name)

    print(status_codes)


if __name__ == "__main__":
    main()
