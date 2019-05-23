import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import GitHubButton from 'react-github-btn';
import logo from '../../logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="header__logo" alt="logo" />
        <Typography variant="headline" color="inherit">
          Welcome to Franky App
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          Generate your CV now!
        </Typography>
        <p>
          <GitHubButton 
            href="https://github.com/itmo-cet-sem/franky" 
            data-icon="octicon-star" data-show-count="true"
            aria-label="Star itmo-cet-sem/franky on GitHub"
          >Star</GitHubButton>
        </p>
      </header>
    );
  }
}

export default Header;