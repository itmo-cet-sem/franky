import React, { Component } from 'react';
import { Card, CardContent , CardMedia, Typography, CircularProgress } from '@material-ui/core';
import './ActivityCard.css';

class ActivityCard extends Component {
  render() {
    const { logo, title, tags, name, error, isLoading } = this.props;
    let contentInfo;

    if (isLoading) {
      contentInfo = 'Loading data';
    } else if (!error) {
      contentInfo = <ul>
        <li>Name: { name || '(not set)'}</li>
        <li>Languages: { tags && tags.length ?
          tags.map((item, i) => <span key={i}>{item} </span>) :
          'no languages'
        }</li>
      </ul>;
    } else {
      contentInfo = error;
    }

    return (
      <Card className="activity-card">
        {isLoading && <div className="activity-card__loader-wrapper">
          <CircularProgress className="activity-card__progress" size={68} color="secondary" />
        </div>}
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={logo}
          title="Contemplative Reptile"
          className="activity-card__logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="div">
            { contentInfo }
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ActivityCard;