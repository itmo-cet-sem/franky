import { createStore } from 'redux';
import testReducer from '../reducers/testReducer';

const store = createStore(testReducer);

store.subscribe(() => {
	console.log('subscribe: something happened - ', store.getState());
});

// Example of using
// store.dispatch({ type: 'ADD_TRACK', payload: 'Smells like teen spirit'});

export default store;