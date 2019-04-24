import { combineReducers } from 'redux';
import observableReducer from './observableReducer';

let reducers = combineReducers({
  observableInfo: observableReducer
});

export default reducers;