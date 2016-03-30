import {connect} from 'react-redux';
import React from 'react';
import Main from './components/Main.jsx';
import { fetchUserInfo } from './actions/actions.js';

const mapStateToProps = state => {
  return {
    state: state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: () => {
      dispatch(fetchUserInfo())
    }
  }
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default AppContainer;
