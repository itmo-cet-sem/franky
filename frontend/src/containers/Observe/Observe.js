import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBlock from '../SearchBlock/SearchBlock';
import ActivityInfo from '../ActivityInfo/ActivityInfo';
import { Typography, Grid } from '@material-ui/core';
import './Observe.css';

class Observe extends Component {
  render() {
    return (
      <div className="observe-wrapper">
        <Grid container justify="center">
          <Grid
            item
            xs={12}
            md={10}
            lg={8}
            className="observe-grid-wrapper"
          >
            <Typography variant="h3" align="center">
              Try it now!
            </Typography>
            <Grid item xs={12} align="center">
              <SearchBlock />
            </Grid>
            <ActivityInfo />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  (state) => ({ info: state.observableInfo })
)(Observe);
