import {connect} from 'react-redux';
import React from 'react';
import Main from './components/Main.jsx';
import {fetchUserInfo, fetchProducts, fetchRounds, fetchTickets, claimTicket, viewingProduct, ownTickets, deselectTicket} from './actions/actions.js';

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: () => {
      dispatch(fetchUserInfo());
    },
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    fetchRounds: id => {
      dispatch(fetchRounds(id));
    },
    fetchTickets: id => {
      dispatch(fetchTickets(id));
    },
    claimTicket: value => {
      dispatch(claimTicket(value));
    },
    viewingProduct: id => {
      dispatch(viewingProduct(id));
    },
    ownTickets: (values, round) => {
      dispatch(ownTickets(values, round));
    },
    deselectTicket: value => {
      dispatch(deselectTicket(value));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default AppContainer;
