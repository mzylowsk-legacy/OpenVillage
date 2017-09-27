import argparse
import datetime
import os
import shutil
import subprocess
import time
import urlparse
import ntpath

STATUSES = {
    'SUCCESS': 0,
    'FAIL': 1,
    'WAITING': 777,
    'DURING': 888,
    'IGNORED': 999
}

status_codes = []

def are_previous_steps_failed():
    return False if not sum(status_codes) else True

def download_repository(workspace, project_name, url, username, password, build_name):
    order = 0
    try:
        if username and password:
            parsed_url = urlparse.urlsplit(url)
            output = subprocess.check_output(
                ['git', 'clone', 'https://{}:{}@{}{}'.format(username, password, parsed_url.netloc, parsed_url.path)],
                cwd=workspace)
        else:
            output = subprocess.check_output(['git', 'clone', url, project_name], cwd=workspace)

    except subprocess.CalledProcessError as e:
        print('Error in downloading repository: {}'.format(e.output))
        status_codes.append(e.returncode)

def set_repository_version(workspace, project_name, version, build_name):
    order = 1
    if are_previous_steps_failed():
        print('Skipping due to previous step failed')
        status_codes.append(STATUSES['IGNORED'])
        return

    repo_dir = os.path.join(workspace, project_name)
    try:
        output = subprocess.check_output(['git', 'checkout', version], cwd=repo_dir)
        status_codes.append(STATUSES['SUCCESS'])
    except subprocess.CalledProcessError as e:
        print('Cannot set version: {}'.format(e.output))
        status_codes.append(e.returncode)


def get_diff_between_commits(workspace, project_name, lastCommit, currentCommit):
    repo_dir = os.path.join(workspace, project_name)
    try:
        output = subprocess.check_output(['git', 'diff', lastCommit, currentCommit ], cwd=repo_dir)
        print(output)
    except Exception as e:
        print('Cannot get diff: {}'.format(e.output))


def delete_repository_dir(workspace, project_name):
    shutil.rmtree(os.path.join(workspace, project_name), ignore_errors=True)


def parse_args():
    parser = argparse.ArgumentParser(description='Gets git diff between two commits')

    parser.add_argument('-x', '--build-name', required=True, help='Build name')
    parser.add_argument('-u', '--username', required=False, help='Github username')
    parser.add_argument('-p', '--password', required=False, help='Password for Github user')
    parser.add_argument('-o', '--project-owner', required=False, help='Project owner')
    parser.add_argument('-n', '--project-name', required=True, help='Project name')
    parser.add_argument('-v', '--project-version', required=True, help='Project version')
    parser.add_argument('-g', '--github-url', required=True, help='Url to Github repository')
    parser.add_argument('-d', '--destination', required=True, help='Destination workdir')
    parser.add_argument('-t', '--commitSHA', required=True, help='GitHub head commit sha')
    parser.add_argument('-l', '--lastCommitSHA', required=True, help='GitHub commit sha to compare with current head')

    return parser.parse_args()



def main():
    args = parse_args()

    if not os.path.exists(args.destination):
            os.makedirs(args.destination)
    download_repository(args.destination, args.project_name, args.github_url, args.username, args.password, args.build_name)
    set_repository_version(args.destination, args.project_name, args.project_version, args.build_name)
    get_diff_between_commits(args.destination, args.project_name, args.lastCommitSHA, args.commitSHA)
    delete_repository_dir(args.destination, args.project_name)


if __name__ == "__main__":
    main()