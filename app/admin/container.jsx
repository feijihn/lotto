'use strict';
import {connect} from 'react-redux';
import React from 'react';
import Main from './components/Main.jsx';
import {fetchProducts, fetchRounds, fetchContent} from './actions/actions.js';

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    fetchRounds: () => {
      dispatch(fetchRounds());
    },
    fetchContent: () => {
      dispatch(fetchContent());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default AppContainer;
