import {
  SET_OBSERVABLE_LOGIN,
  RECEIVE_GITHUB_DATA,
  REQUEST_GITHUB_DATA,
  ERROR_GITHUB_DATA,
  SEARCH_ANY
} from '../actions/index';

let initObservableInfo = {
  login: null,
  isLoading: false,
  calledSearchAny: false,
  github: {},
  stackoverflow: {},
  dockerhub: {}
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
    default: 
      return state;
  }
};