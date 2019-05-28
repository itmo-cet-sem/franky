import {
  SET_OBSERVABLE_LOGIN,
  RECEIVE_GITHUB_DATA,
  REQUEST_GITHUB_DATA,
  ERROR_GITHUB_DATA,
  SEARCH_ANY,
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS,
  ERROR_PROJECTS,
  RECEIVE_STACK_DATA,
  REQUEST_STACK_DATA,
  ERROR_STACK_DATA,
  RECEIVE_DOCKER_DATA,
  REQUEST_DOCKER_DATA,
  ERROR_DOCKER_DATA
} from '../actions/index';

let initObservableInfo = {
  login: null,
  isLoading: false,
  calledSearchAny: false,
  github: {},
  stackoverflow: {},
  dockerhub: {},
  projects: [],
  isProjectsLoading: false
};

export default (state = initObservableInfo, action) => {
  switch (action.type) {
    case SET_OBSERVABLE_LOGIN:
      return {
        ...state,
        login: action.login
      };
    case REQUEST_GITHUB_DATA:
      return {
        ...state,
        github: {
          isLoading: true
        }
      };
    case RECEIVE_GITHUB_DATA:
      return {
        ...state,
        github: {
          ...state.github,
          login: action.data.login,
          name: action.data.name,
          tags: action.data.tags,
          isLoading: false
        }
      };
    case ERROR_GITHUB_DATA:
      return {
        ...state,
        github: {
          error: 'No data'
        }
      };
    case SEARCH_ANY:
      return {
        ...state,
        calledSearchAny: true
      };
    case REQUEST_PROJECTS:
      return {
        ...state,
        projects: [],
        isProjectsLoading: true
      };
    case RECEIVE_PROJECTS:
      return {
        ...state,
        projects: action.data,
        isProjectsLoading: false
      };
    case ERROR_PROJECTS:
      return {
        ...state,
        projects: [],
        isProjectsLoading: false
      };
    case REQUEST_STACK_DATA:
      return {
        ...state,
        stackoverflow: {
          isLoading: true
        }
      };
    case RECEIVE_STACK_DATA:
      return {
        ...state,
        stackoverflow: {
          ...state.stackoverflow,
          login: action.data.login,
          name: action.data.name,
          tags: action.data.tags,
          isLoading: false
        }
      };
    case ERROR_STACK_DATA:
      return {
        ...state,
        stackoverflow: {
          error: 'No data'
        }
      };
    case REQUEST_DOCKER_DATA:
      return {
        ...state,
        dockerhub: {
          isLoading: true
        }
      };
    case RECEIVE_DOCKER_DATA:
      return {
        ...state,
        dockerhub: {
          ...state.dockerhub,
          login: action.data.login,
          name: action.data.name,
          tags: action.data.tags,
          isLoading: false
        }
      };
    case ERROR_DOCKER_DATA:
      return {
        ...state,
        dockerhub: {
          error: 'No data'
        }
      };
    default: 
      return state;
  }
};