export const GET_FULL_DATA = 'GET_FULL_DATA';
export const GET_FULL_DATA_FINISH = 'GET_FULL_DATA_FINISH';

export const REQUEST_GITHUB_DATA = 'REQUEST_GITHUB_DATA';
export const REQUEST_STACK_DATA = 'REQUEST_STACK_DATA';
export const REQUEST_DOCKER_DATA = 'REQUEST_DOCKER_DATA';
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';

export const RECEIVE_GITHUB_DATA = 'RECEIVE_GITHUB_DATA';
export const RECEIVE_STACK_DATA = 'RECEIVE_STACK_DATA';
export const RECEIVE_DOCKER_DATA = 'RECEIVE_DOCKER_DATA';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

export const ERROR_GITHUB_DATA = 'ERROR_GITHUB_DATA';
export const ERROR_STACK_DATA = 'ERROR_STACK_DATA';
export const ERROR_DOCKER_DATA = 'ERROR_DOCKER_DATA';
export const ERROR_PROJECTS = 'ERROR_PROJECTS';

export const SET_OBSERVABLE_LOGIN = 'SET_OBSERVABLE_LOGIN';
export const SEARCH_ANY = 'SEARCH_ANY';

const _makeRequest = (apiUrl, requestType, receiveType, errorType) => (dispatch) => {
  dispatch({ type: requestType });
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => dispatch({
      type: receiveType,
      data: json
    }))
    .catch((err) => {
      dispatch({
        type: errorType,
        message: 'some message'
      });
    });
};

export const setLogin = (login) => ({
  type: SET_OBSERVABLE_LOGIN,
  login
});

export const getFullData = (login) => (dispatch) => {
  dispatch(setLogin(login));

  let res = Promise.all([
    dispatch(
      _makeRequest(
        '/api/github/' + login,
        REQUEST_GITHUB_DATA,
        RECEIVE_GITHUB_DATA,
        ERROR_GITHUB_DATA
      )
    ),
    dispatch(
      _makeRequest(
        '/api/github/' + login + '/projects',
        REQUEST_PROJECTS,
        RECEIVE_PROJECTS,
        ERROR_PROJECTS
      )
    ),
    dispatch(
      _makeRequest(
        '/api/stackoverflow/' + login,
        REQUEST_STACK_DATA,
        RECEIVE_STACK_DATA,
        ERROR_STACK_DATA
      )
    ),
     dispatch(
       _makeRequest(
         '/api/dockerhub/' + login,
         REQUEST_DOCKER_DATA,
         RECEIVE_DOCKER_DATA,
         ERROR_DOCKER_DATA
       )
     )
  ]).then((resArr) => {
    dispatch({ type: GET_FULL_DATA_FINISH });
  });

  return res;
};

export const searchAny = () => {
  return { type: SEARCH_ANY };
};