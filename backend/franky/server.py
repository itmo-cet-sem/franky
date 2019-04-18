import os
from typing import List

from flask import Flask

from model import UserData
from model.project import ProjectData
from service import GitHub, StackOverflow
from utils import convert_to_json

app = Flask(__name__)


@app.route('/ping', methods=['GET'])
def ping() -> str:
    return 'From franky with ping!'


@app.route('/api/github/<username>', methods=['GET'])
def github_user(username) -> UserData:
    return GitHub().user(username).to_json()


@app.route('/api/github/<username>/projects', methods=['GET'])
def github_projects(username) -> List[ProjectData]:
    return GitHub().projects(username).to_json()


@app.route('/api/stackoverflow/<username>', methods=['GET'])
def stackoverflow(username):
    return StackOverflow().user(username).to_json()


if __name__ == '__main__':
    docker_host = os.getenv('DOCKER_NETWORK_HOST', '0.0.0.0')
    app.run(host=docker_host)
