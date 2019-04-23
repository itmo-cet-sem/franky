import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityInfo extends Component {
  render() {
    let { info } = this.props;

    return (
      <div className="activity-info">
        <p>Username: @{ this.props.info.login }</p>
        <div className="b-activity activity-info__github">
          <p>Github</p>
          { !info.github.error ? (
            <ul>
              <li>Loading: { this.props.info.github.isLoading ? '+' : '-'}</li>
              <li>Name: { this.props.info.github.name || '(not set)'}</li>
              <li>Languages: { info.github.languages && info.github.languages.length ?
                info.github.languages.map((item, i) => <span key={i}>{item} </span>) :
                'no languages'
              }</li>
            </ul>) : (
            <p>{ info.github.error }</p>
            )
          }
        </div>
        <div className="b-activity activity-info__stackoverflow">
          <p>Stackoverflow</p>
          @TODO
        </div>
        <div className="b-activity activity-info__dockerhub">
          <p>Dockerhub</p>
          @TODO
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ info: state.observableInfo })
)(ActivityInfo);