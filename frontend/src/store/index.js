import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/';

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
	console.log('subscribe: something happened - ', store.getState());
});

// Example of using
// store.dispatch({ type: 'ADD_TRACK', payload: 'Smells like teen spirit'});

export default store;