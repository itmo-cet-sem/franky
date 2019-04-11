import os
from flask import Flask

app = Flask(__name__)


@app.route('/ping')
def ping():
    return 'From franky with ping! trigger deploy'


docker_host=os.getenv('DOCKER_NETWORK_HOST') or '0.0.0.0'

if __name__ == '__main__':
    app.run(host=docker_host)
