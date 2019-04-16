import os
from flask import Flask
from service import GitHub
from utils import json_endpoint

app = Flask(__name__)


@app.route('/ping', methods=['GET'])
def ping():
    return 'From franky with ping!'


@app.route('/api/github/<username>', methods=['GET'])
@json_endpoint
def github(username):
    return GitHub().user(username)


docker_host=os.getenv('DOCKER_NETWORK_HOST') or '0.0.0.0'

if __name__ == '__main__':
    app.run(host=docker_host)
