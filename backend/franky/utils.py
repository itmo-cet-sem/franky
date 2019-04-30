import json


def convert_to_json(obj):
    return json.dumps(obj, default=lambda o: o.__dict__, ensure_ascii=False).encode('utf8')
