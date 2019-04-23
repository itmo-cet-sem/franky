import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFullData } from '../../actions/index';
import './SearchBlock.css';

class SearchBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: ''
    };
  }
  _onSearch = (event) => {
    const { dispatch } = this.props;

    dispatch(getFullData(this.state.login));
  }

  _onLoginChange = (event) => {
    this.setState({ login: event.target.value });
  }

  render() {
    return (
      <div className="b-search">
        <input value={this.state.login} onChange={this._onLoginChange} className="b-search__input" />
        <button className="b-search__clear">X</button>
        <button 
          onClick={this._onSearch}
          disabled={this.props.info.github.isLoading || this.props.info.stackoverflow.isLoading || this.props.info.dockerhub.isLoading}
          className="b-search__request">
          search
        </button>
      </div>
    );
  }
}

export default connect(
  (state0 => ({ info: state.observableInfo })
)(SearchBlock);