import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { PersonPin, Code, Fingerprint, Assignment } from '@material-ui/icons';
import './Description.css';

class Description extends Component {
  render() {
    return (
      <div className="description-wrapper">
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className="description-grid-wrapper"
          >
            <Grid container spacing={16}  alignItems="stretch" className="description-list">
              <Grid item xs={12} sm={3} align="center" className="description__item">
                <div>
                  <Code className="description__item-icon" />
                  <Typography variant="headline"  color="inherit" gutterBottom>
                    Franky
                  </Typography>
                  <Typography variant="body1" color="inherit">
                    Franky is a service for building employer profile via information in professional activity
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} align="center" className="description__item">
                <div>
                  <PersonPin className="description__item-icon" />
                  <Typography variant="headline"  color="inherit" gutterBottom>
                    Check socials
                  </Typography>
                  <Typography variant="body1" color="inherit">
                    We check your profile in Github, Stackoverflow and Dockerhub
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} align="center" className="description__item">
                <div>
                <Fingerprint className="description__item-icon" />
                <Typography variant="headline"  color="inherit" gutterBottom>
                  Use it
                </Typography>
                <Typography color="inherit">
                  Input your username in this services
                </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} align="center" className="description__item">
                <div>
                <Assignment className="description__item-icon" />
                <Typography variant="headline"  color="inherit" gutterBottom>
                  Show CV!
                </Typography>
                <Typography color="inherit">
                  See agregation of your activity in generated CV
                </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Description;