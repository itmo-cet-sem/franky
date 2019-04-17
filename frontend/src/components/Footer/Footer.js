import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__app-name">Franky App © 2019</p>
          <p className="footer__app-description">Employee profile aggregator</p>
        </div>
      </footer>
    );
  }
}

export default Footer;