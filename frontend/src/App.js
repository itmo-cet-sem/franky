import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Observe from './containers/Observe/Observe';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import store from './store';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/> 
        <Provider store={store}>
          <Observe/>
        </Provider>
        <Footer/>
      </div>
    );
  }
}

export default App;
