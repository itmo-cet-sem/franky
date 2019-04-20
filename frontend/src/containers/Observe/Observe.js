import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBlock from '../SearchBlock/SearchBlock';
import ActivityInfo from '../ActivityInfo/ActivityInfo';

class Observe extends Component {
	componentDidMount() {
  	// const { dispatch } = this.props;
  	// console.log(dispatch({ type: 'TEST' }));
	}

  render() {
  	console.log(this.props);
  	// let x = fetch('/api/github/dyadyajora')
  	// 	.then(res => res.json())
  	// 	.then(json => console.log(json))

  	// console.log(x);
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
	state => ({ info: state.observableInfo, test: state.test })
)(Observe);
