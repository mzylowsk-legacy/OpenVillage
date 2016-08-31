# run Openvillage api server before running this script!
# For now this script only works with localhost instalation of Openvillage!
import json
import random
import requests
import string
import yaml

from pymongo import MongoClient

SERVER_URL = "http://localhost:8080"
DB_URL = "mongodb://localhost:27017/"
PASS_FOR_ALL_USERS = "qazwsx"


def register_user(username, password, email, full_name):
    payload = {"username": username,
               "password": password,
               "email": email,
               "fullname": full_name,
               "birthdate": "02/02/1992"}
    r = requests.post(SERVER_URL + "/api/users/add", data=payload)
    print('Adding user {} ({}): {}'.format(username, email, r.status_code))
    if r.status_code != 200:
        raise ValueError(r.text)


def get_access_token(username, password):
    payload = {"username": username,
               "password": password}
    r = requests.post(SERVER_URL + "/api/users/login", data=payload)
    try:
        return json.loads(r.text)["token"]
    except KeyError:
        print("Authorization fail! :<")
        exit(1)


def add_project_for_user(username, user_password, project_name, url, repo_password, repo_username, is_private):
    payload = {"username": repo_username,
               "password": repo_password,
               "description": "".join([random.choice(string.letters[:26]) for _ in xrange(15)]),
               "url": url,
               "name": project_name,
               "isPrivate": is_private}
    headers = {"Authorization": "Bearer " + get_access_token(username, user_password),
               'Content-type': 'application/json'}
    r = requests.post(SERVER_URL + "/auth/api/projects/add", data=json.dumps(payload), headers=headers)
    print('Adding project {} for user {} ({}): {}'.format(project_name, username, url, r.status_code))
    if r.status_code != 200:
        raise ValueError(r.text)


def add_script_for_user(username, password, script_name, code):
    payload = {"name": script_name,
               "code": code}
    headers = {"Authorization": "Bearer " + get_access_token(username, password)}
    r = requests.post(SERVER_URL + "/auth/api/scripts/add", data=payload, headers=headers)
    print('Adding script {} for user {}: {}'.format(script_name, username, r.status_code))
    if r.status_code != 200:
        raise ValueError(r.text)


# activate all users via mongo db query
def activate_all_users():
    print("Activating all inactive users...")
    client = MongoClient(DB_URL)
    db = client["openvillage"]
    collection = db["users"]
    collection.update_many(
        {"activated": False},
        {
            "$set": {"activated": True},
        }
    )
    print("All inactive users activated!")


def clear_database():
    print "Cleaning database for you..."
    client = MongoClient(DB_URL)
    db = client["openvillage"]
    db.users.delete_many({})
    db.projects.delete_many({})
    db.scripts.delete_many({})


def fill_database():
    with open("data.yml", "r") as stream:
        try:
            doc = (yaml.load(stream))
            for user in doc["users"]:
                register_user(user["username"], PASS_FOR_ALL_USERS, user["email"], user["full_name"])
            activate_all_users()
            for project in doc["projects"]:
                add_project_for_user(project["user"], PASS_FOR_ALL_USERS, project["project_name"], project["repo_url"],
                                     project["repo_pass"], project["repo_username"], project["is_private"])
            for script in doc["scripts"]:
                add_script_for_user(script["user"], PASS_FOR_ALL_USERS, script["name"], script["code"])
        except yaml.YAMLError as exc:
            print(exc)


if __name__ == "__main__":
    clear_database()
    fill_database()
