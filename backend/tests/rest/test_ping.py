from franky.server import ping


def test_ping_response():
    assert ping() == 'From franky with ping!'
