import {
  SET_OBSERVABLE_LOGIN,
  RECEIVE_GITHUB_DATA,
  ERROR_GITHUB_DATA
} from '../actions/index';

let initObservableInfo = {
  login: null,
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
    case RECEIVE_GITHUB_DATA: 
      return {
        ...state,
        github: {
          ...state.github,
          login: action.data.login,
          name: action.data.name,
          languages: action.data.languages
        }
      };
    case ERROR_GITHUB_DATA: 
      return {
        ...state,
        github: {
          error: 'No data'
        }
      };
    default: 
      return state;
  }
};