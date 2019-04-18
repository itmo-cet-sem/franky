import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {
  render() {
  	console.log(this.props.observableInfo);
    return (
      <div>
        @todo Soon
      </div>
    );
  }
}

export default connect(
	state => ({ observableInfo: state.observableInfo })
)(Test);
