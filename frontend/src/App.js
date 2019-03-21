import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Test from './components/Test/Test';
import store from './store';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Franky App.
          </p>
        </header>
        <Provider store={store}>
          <Test/>
        </Provider>
      </div>
    );
  }
}

export default App;
