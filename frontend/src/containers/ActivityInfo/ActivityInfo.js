import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import Timeline from '../../components/Timeline/Timeline';
import './ActivityInfo.css';
import githubLogo from './github-logo.png';
import stackLogo from './stack-logo.png';
import dockerLogo from './docker-logo.png';

class ActivityInfo extends Component {
  render() {
    let { info } = this.props;
    let allErrored = info.github.error && info.stackoverflow.error && info.dockerhub.error;

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
          { (allErrored || !info.github.error) && <Grid item xs={12} sm={4}>
            <ActivityCard
              title="Github Profile"
              logo={githubLogo}
              isLoading={info.github.isLoading}
              name={info.github.name}
              tags={info.github.tags}
              error={info.github.error}
            />
          </Grid>
          }
          { !info.stackoverflow.error && <Grid item xs={12} sm={4}>
            <ActivityCard
              title="Stackoverflow Profile"
              logo={stackLogo}
              isLoading={info.stackoverflow.isLoading}
              name={info.stackoverflow.name}
              tags={info.stackoverflow.tags}
              error={info.stackoverflow.error}
            />
          </Grid>
          }
          { !info.dockerhub.error && <Grid item xs={12} sm={4}>
            <ActivityCard
              title="DockerHub Profile"
              logo={dockerLogo}
              isLoading={info.dockerhub.isLoading}
              name={info.dockerhub.name}
              tags={info.dockerhub.tags}
              error={info.dockerhub.error}
            />
          </Grid>
          }
        </Grid>

        <Grid container className="timeline-wrapper">
          <Grid item xs={12}>
            <Timeline 
              projects={info.projects}
              loading={info.isProjectsLoading}
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