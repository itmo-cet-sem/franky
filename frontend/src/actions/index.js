export const GET_FULL_DATA = 'GET_FULL_DATA';

export const REQUEST_GITHUB_DATA = 'REQUEST_GITHUB_DATA';
export const REQUEST_STACK_DATA = 'REQUEST_STACK_DATA';
export const REQUEST_DOCKER_DATA = 'REQUEST_DOCKER_DATA';

export const RECEIVE_GITHUB_DATA = 'RECEIVE_GITHUB_DATA';
export const RECEIVE_STACK_DATA = 'RECEIVE_STACK_DATA';
export const RECEIVE_DOCKER_DATA = 'RECEIVE_DOCKER_DATA';

export const ERROR_GITHUB_DATA = 'ERROR_GITHUB_DATA';
export const ERROR_STACK_DATA = 'ERROR_STACK_DATA';
export const ERROR_DOCKER_DATA = 'ERROR_DOCKER_DATA';

export const SET_OBSERVABLE_LOGIN = 'SET_OBSERVABLE_LOGIN';

const _getFromGithub = login => dispatch => {
  console.log('getting');
  return fetch('/api/github/' + login)
    .then(res => res.json())
    .then(json => dispatch({
      type: RECEIVE_GITHUB_DATA,
      data: json
    }))
    .catch(err => {
      console.log(err, 'err');
      dispatch({
        type: ERROR_GITHUB_DATA,
        message: 'some message'
      });
    });
};

export const setLogin = login => ({
  type: SET_OBSERVABLE_LOGIN,
  login
});

export const getFullData = login => dispatch => {
  dispatch(setLogin(login));
  console.log('get full data');
  return dispatch(_getFromGithub(login));
};