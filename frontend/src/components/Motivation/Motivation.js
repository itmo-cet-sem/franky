import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import './Motivation.css';

class Motivation extends Component {
  render() {
    return (
      <div className="motivation-wrapper">
        <div className="overlay"></div>
        <div className="motivation">
          <Typography variant="display2" color="inherit" align="center" gutterBottom>
            ⏫ Type username and build curriculum vitae
          </Typography>
          <Typography variant="headline" color="inherit" align="center">
            based on activity in professional social network: Github, Stackoverflow, Dockerhub
          </Typography>
        </div>
      </div>
    );
  }
}

export default Motivation;