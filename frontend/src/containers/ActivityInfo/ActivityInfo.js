import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './ActivityInfo.css';
import githubLogo from './github-logo.png';
import stackLogo from './stack-logo.png';
import dockerLogo from './docker-logo.png';

class ActivityInfo extends Component {
  render() {
    let { info } = this.props;

    return (
      <div className="activity-info">
        <Paper className="activity-info__common" elevation={1}>
          <Typography variant="h5" component="h3">
            Common info
          </Typography>
          <Typography component="p">
            <b>Username:</b> @{ this.props.info.login }
          </Typography>
        </Paper>

        <Grid container spacing={16} alignItems="stretch" className="activity-cards-wrapper">
          <Grid item xs={12} sm={4}>
            <ActivityCard
              title="Github Profile"
              logo={githubLogo}
              isLoading={info.github.isLoading}
              name={info.github.name}
              tags={info.github.tags}
              error={info.github.error}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ActivityCard
              title="Stackoverflow Profile"
              logo={stackLogo}
              error="@TODO"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ActivityCard
              title="DockerHub Profile"
              logo={dockerLogo}
              error="@TODO"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  (state) => ({ info: state.observableInfo })
)(ActivityInfo);