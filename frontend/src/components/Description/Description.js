import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { PersonPin, Fingerprint, Assignment } from '@material-ui/icons';
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
              <Grid item xs={12} sm={4} align="center" className="description__item">
                <div>
                  <PersonPin className="description__item-icon" />
                  <Typography variant="headline"  color="inherit" gutterBottom>
                    Check socials
                  </Typography>
                  <Typography variant="body1" color="inherit" align="left">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, laboriosam quos tempore explicabo dolor laborum numquam ipsa neque ut tenetur, ad doloribus nobis atque nulla beatae! Quidem recusandae iure atque.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} align="center" className="description__item">
                <div>
                <Fingerprint className="description__item-icon" />
                <Typography variant="headline"  color="inherit" gutterBottom>
                  Input your name
                </Typography>
                <Typography color="inherit" align="left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, laboriosam quos tempore explicabo dolor laborum numquam ipsa neque ut tenetur, ad doloribus nobis atque nulla beatae! Quidem recusandae iure atque.
                </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} align="center" className="description__item">
                <div>
                <Assignment className="description__item-icon" />
                <Typography variant="headline"  color="inherit" gutterBottom>
                  Show CV!
                </Typography>
                <Typography color="inherit" align="left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, laboriosam quos tempore explicabo dolor laborum numquam ipsa neque ut tenetur, ad doloribus nobis atque nulla beatae! Quidem recusandae iure atque.
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