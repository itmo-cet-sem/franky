from flask import Flask

app = Flask(__name__)


@app.route('/ping')
def ping():
    return 'From franky with ping!'


if __name__ == '__main__':
    app.run(host='http://0.0.0.0')
