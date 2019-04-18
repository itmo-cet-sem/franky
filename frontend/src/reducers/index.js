import { combineReducers } from 'redux';
import testReducer from './testReducer';
import observableReducer from './observableReducer';

let reducers = combineReducers({
  test: testReducer,
  observableInfo: observableReducer
});

export default reducers;