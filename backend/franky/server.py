import os
from typing import List

from flask import Flask

from model import UserData
from utils import convert_to_json
from model.project import ProjectData
from service import GitHub, StackOverflow, DockerHub

app = Flask(__name__)


@app.route('/ping', methods=['GET'])
def ping() -> str:
    return 'From franky with ping!'


@app.route('/api/github/<username>', methods=['GET'])
def github_user(username) -> UserData:
    return convert_to_json(GitHub().user(username))


@app.route('/api/github/<username>/projects', methods=['GET'])
def github_projects(username) -> List[ProjectData]:
    return convert_to_json(GitHub().projects(username))


@app.route('/api/stackoverflow/<username>', methods=['GET'])
def stackoverflow(username):
    return convert_to_json(StackOverflow().user(username))


@app.route('/api/dockerhub/<username>', methods=['GET'])
def dockerhub_user(username) -> UserData:
    return convert_to_json(DockerHub().user(username))


@app.route('/api/dockerhub/<username>/projects', methods=['GET'])
def dockerhub_projects(username) -> List[ProjectData]:
    return convert_to_json(DockerHub().projects(username))


if __name__ == '__main__':
    docker_host = os.getenv('DOCKER_NETWORK_HOST', '0.0.0.0')
    app.run(host=docker_host)
