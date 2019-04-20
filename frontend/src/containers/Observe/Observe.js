import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBlock from '../SearchBlock/SearchBlock';
import ActivityInfo from '../ActivityInfo/ActivityInfo';

class Observe extends Component {
  render() {
    return (
      <div>
        <h3>Try iy now!</h3>
        <SearchBlock />
        <ActivityInfo />
      </div>
    );
  }
}

export default connect(
  state => ({ info: state.observableInfo })
)(Observe);
