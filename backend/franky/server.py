from flask import Flask
from service import GitHub
from utils import json_endpoint
import os
from flask import Flask

app = Flask(__name__)


@app.route('/ping', methods=['GET'])
def ping():
    return 'From franky with ping!'


@app.route('/api/github/<username>', methods=['GET'])
@json_endpoint
def github(username):
    return GitHub().user(username)


if __name__ == '__main__':
    app.run()
