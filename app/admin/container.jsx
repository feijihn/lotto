'use strict';
import {connect} from 'react-redux';
import React from 'react';
import Main from './components/Main.jsx';
import { fetchProducts, fetchRounds } from './actions/actions.js';

const mapStateToProps = state => {
  return {
    state: state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    fetchRounds: () => {
      dispatch(fetchRounds());
    }
  }
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default AppContainer;
