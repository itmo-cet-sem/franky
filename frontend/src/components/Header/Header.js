import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="header__logo" alt="logo" />
        <p>
          Welcome to Franky App.
        </p>
      </header>
    );
  }
}

export default Header;