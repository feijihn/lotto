import {connect} from 'react-redux';
import React from 'react';
import Main from './components/Main.jsx';
import {fetchUserInfo, fetchProducts, fetchRounds, fetchTickets, claimTicket, viewingProduct, ownTickets, deselectTicket, markAlertAsRead, fetchRoundsArchive, clearTickets, selectAllTickets, fetchContent, fetchRoundById} from './actions/actions.js';

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
    fetchTickets: (id, archive) => {
      dispatch(fetchTickets(id, archive));
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
    },
    markAlertAsRead: alertId => {
      dispatch(markAlertAsRead(alertId));
    },
    fetchRoundsArchive: () => {
      dispatch(fetchRoundsArchive());
    },
    clearTickets: () => {
      dispatch(clearTickets());
    },
    selectAllTickets: () => {
      dispatch(selectAllTickets());
    },
    fetchContent: () => {
      dispatch(fetchContent());
    },
    fetchRoundById: roundId => {
      dispatch(fetchRoundById(roundId));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default AppContainer;
