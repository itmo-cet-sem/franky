import React, { Component, Fragment } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { CircularProgress, Chip, Typography } from '@material-ui/core';
import { Error as ErrorIcon, Beenhere as BeenHereIcon, Stars as StarsIcon } from '@material-ui/icons';
import './Timeline.css';
import 'react-vertical-timeline-component/style.min.css';

class Timeline extends Component {

  _printDate(start, end) {
    let startDate, endDate;
    let now = new Date();
    let twoWeeksinMs = 2 * 7 * 24 * 60 * 60 * 1000;
    let monthStart, yearStart, monthEnd, yearEnd;
    let resultString = '';

    monthStart = start.toLocaleDateString('en', { month: 'long'});
    yearStart = start.getFullYear();
    startDate = monthStart + ', ' + yearStart;

    if (now.getTime() - end.getTime() < twoWeeksinMs) {
      endDate = 'present';
    } else {
      monthEnd = end.toLocaleDateString('en', { month: 'long'});
      yearEnd = end.getFullYear();

      endDate = monthEnd + ', ' + yearEnd;
    }

    resultString = startDate === endDate ? startDate : startDate + ' - ' + endDate;

    return resultString;
  }

  render() {
    const { projects, loading } = this.props;

    let projectsItems = projects.map((item) => {
      return {
        ...item,
        startTime: new Date(item['start']),
        endTime: item['end'] ? new Date(item['end']) : new Date(),
      };
    }).sort((a, b) => {
      if (a.endTime.getTime() < b.endTime.getTime()) {
        return 1;
      } else {
        return -1;
      }
    }).map((item, i) => {
      return (
        <VerticalTimelineElement
          key={i}
          className="vertical-timeline-element--work timeline-item"
          date={this._printDate(item.startTime, item.endTime)}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<BeenHereIcon />}
        >
          <h3 className="vertical-timeline-element-title timeline-item__title">{item.name.toUpperCase()}</h3>
          <div>
            { (item.tags && item.tags.length) ? item.tags.map((item, i) => <Chip className="timeline__chip" label={item} key={i} />) : 'No tags' }
          </div>
        </VerticalTimelineElement>
      );
    });

    return (
      <Fragment>
        <Typography variant="h5" component="h4" className="timeline__title">
          { projects.length || loading ? 'Projects:' :'No projects found'}
        </Typography>
        <VerticalTimeline>
          { projectsItems }
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 243, 60)', color: '#fff' }}
            icon={ loading ?
              <div className="timeline-loader-wrapper"><CircularProgress size={40} color="secondary" className="timeline__loader" /></div>
              : projects.length ?
                <StarsIcon />
                :  <ErrorIcon /> }
          />
        </VerticalTimeline>
      </Fragment>
    );
  }
}

export default Timeline;