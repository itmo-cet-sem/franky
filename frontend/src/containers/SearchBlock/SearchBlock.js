import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFullData, searchAny } from '../../actions/index';
import SnackbarAlertContent from '../../components/SnackbarAlertContent/SnackbarAlertContent';
import { Paper, InputBase, Button, Snackbar, CircularProgress } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';
import './SearchBlock.css';

class SearchBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      loginErrorOpen: false,
    };
  }

  _onSearch = (event) => {
    const { dispatch } = this.props;

    if (!this.state.login) {
      this._showError();
      return;
    }

    if (this.state.loginErrorOpen) {
      this.setState({ loginErrorOpen: false });
    }

    if (!this.props.info.calledSearchAny) {
      dispatch(searchAny());
    }

    dispatch(getFullData(this.state.login));
  }

  _onLoginChange = (event) => {
    this.setState({ login: event.target.value });
  }

  _handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ loginErrorOpen: false });
  };

  _showError() {
    this.setState({ loginErrorOpen: true });
  }

  render() {
    let loading = this.props.info.github.isLoading || this.props.info.stackoverflow.isLoading || this.props.info.dockerhub.isLoading;

    return (
        <Paper className="b-search" elevation={1}>
          <InputBase
            className="b-search__input"
            placeholder="Type username here"
            value={this.state.login}
            onChange={this._onLoginChange}
          />
          <div className="b-search__btn-wrapper">
            <Button
              className={classNames('b-search__icon-button', loading ? 'b-search__icon-button_loading' : '')}
              size="large"
              color="primary"
              onClick={this._onSearch}
              disabled={loading}
            >
              <SearchIcon />
              Search
              {loading && <CircularProgress size={24} className="b-search__btn-loader" />}
            </Button>
          </div>



          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.loginErrorOpen}
            autoHideDuration={5000}
            onClose={this._handleErrorClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
          >
              <SnackbarAlertContent
                onClose={this._handleErrorClose}
                variant="error"
                message="Login is not defined!"
              />
          </Snackbar>

        </Paper>
    );
  }
}

export default connect(
  (state) => ({ info: state.observableInfo })
)(SearchBlock);