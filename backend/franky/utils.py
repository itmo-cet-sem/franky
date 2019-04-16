import json


def convert_to_json(user):
    return json.dumps(user, default=lambda o: o.__dict__)


def json_endpoint(func):
    def wrapper(*args, **kwargs):
        return convert_to_json(func(*args, **kwargs))

    return wrapper
