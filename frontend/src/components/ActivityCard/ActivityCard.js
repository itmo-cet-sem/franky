import React, { Component } from 'react';
import { Card, CardContent , CardMedia, Typography, CircularProgress } from '@material-ui/core';
import TagChip from '../TagChip/TagChip';
import './ActivityCard.css';

class ActivityCard extends Component {
  render() {
    let { logo, title, tags, name, error, isLoading } = this.props;
    let contentInfo, sortedTags = [];

    if (isLoading) {
      contentInfo = 'Loading data';
    } else if (!error) {
      if (tags  && Object.keys(tags).length) {
        sortedTags = Object.keys(tags);
        sortedTags.sort((a, b) => {
          if (tags[a] < tags[b]) {
            return 1;
          }
          else {
            return -1;
          }
        });
      }

      contentInfo = (<div>
        <p>Name: { name || '(not set)'}</p> 
        <div>
          { tags && Object.keys(tags).length ?
              sortedTags.map((key, i) => 
                <TagChip
                  key={i}
                  tag={key}
                  real={Math.floor(tags[key]*100)}
                  value={Math.floor(tags[key]*100) ? Math.floor(tags[key]*100) : '>1'}
                />) :
              'no languages'
            }
        </div>
      </div>
      );
      
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
          height="140"
          image={logo}
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