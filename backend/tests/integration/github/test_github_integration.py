import pytest
from service import GitHub, GitHubException


@pytest.fixture(scope='module')
def github():
    return GitHub()


def test_github_returns_user_metadata(github):
    user = github.user('octocat')
    assert user.name
    assert user.login
    assert user.tags


def test_github_fails_if_user_does_not_exists(github):
    with pytest.raises(GitHubException):
        github.user('')


def test_github_returns_user_projects(github):
    projects = github.projects('octocat')
    assert projects
    for project in projects:
        assert project.name
        assert project.start
