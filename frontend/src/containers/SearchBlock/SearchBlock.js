import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFullData } from '../../actions/index';
import { Paper, InputBase, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
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
        <Paper className="b-search" elevation={1}>
          <InputBase
            className="b-search__input"
            placeholder="Type username here"
            value={this.state.login}
            onChange={this._onLoginChange}
          />
          <Button
            className="b-search__icon-button"
            size="medium"
            color="primary"
            onClick={this._onSearch}
            disabled={this.props.info.github.isLoading || this.props.info.stackoverflow.isLoading || this.props.info.dockerhub.isLoading}
          >
            <Search />
            Search
          </Button>
        </Paper>
    );
  }
}

export default connect(
  (state) => ({ info: state.observableInfo })
)(SearchBlock);