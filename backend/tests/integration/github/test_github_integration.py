import pytest
from franky.service import GitHub


@pytest.fixture(scope='module')
def github():
    return GitHub()


def test_github_returns_user_metadata(github):
    user = github.user('tcibinan')
    assert user.name
    assert user.login
    assert user.languages
