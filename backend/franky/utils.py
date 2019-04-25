import json


def convert_to_json(obj):
    return json.dumps(obj, default=lambda o: o.__dict__)
