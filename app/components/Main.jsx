import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../actions/actions.js';

injectTapEventPlugin();

class Main extends React.Component {
  getChildContext = () => {
    return {
      store: this.props.state,
      fetchRounds: this.props.fetchRounds,
      fetchUserInfo: this.props.fetchUserInfo,
      fetchTickets: this.props.fetchTickets,
      clearTickets: this.props.clearTickets,
      muiTheme: getMuiTheme(baseTheme),
      selectAllTickets: this.props.selectAllTickets,
      handleProductClick: this.handleProductClick,
      handleTicketClick: this.handleTicketClick,
      deselectTicket: this.deselectTicket,
      fetchProducts: this.props.fetchProducts,
      viewingProduct: this.props.viewingProduct,
      handleBuyClick: this.handleBuyClick,
      fetchRoundById: this.props.fetchRoundById
    };
  };
  componentWillMount = () => {
    this.props.fetchContent();
  }
  componentDidMount = () => {
    this.props.fetchProducts();
    this.props.fetchRoundsArchive();
    if (window.location.hash === '_=_') {
      window.location.hash = '';
    }
  };
  handleTicketClick = value => {
    this.props.claimTicket(value);
  };
  deselectTicket = value => {
    this.props.deselectTicket(value);
  };
  handleBuyClick = () => {
    this.props.ownTickets(this.props.state.markedTickets, this.props.state.round._id);
    this.props.fetchTickets(this.props.state.round._id);
  }
  handleAlertRead = alertId => {
    this.props.markAlertAsRead(alertId);
  }
  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="body-container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

Main.childContextTypes = {
  store: React.PropTypes.object,
  fetchRounds: React.PropTypes.func,
  fetchTickets: React.PropTypes.func,
  fetchUserInfo: React.PropTypes.func,
  clearTickets: React.PropTypes.func,
  handleBuyAllClick: React.PropTypes.func,
  muiTheme: React.PropTypes.object,
  selectAllTickets: React.PropTypes.func,
  handleProductClick: React.PropTypes.func,
  handleTicketClick: React.PropTypes.func,
  deselectTicket: React.PropTypes.func,
  fetchProducts: React.PropTypes.func,
  viewingProduct: React.PropTypes.func,
  handleBuyClick: React.PropTypes.func,
  fetchRoundById: React.PropTypes.func
};

React.Component.contextTypes = {
  store: React.PropTypes.object,
  fetchRounds: React.PropTypes.func,
  fetchTickets: React.PropTypes.func,
  fetchUserInfo: React.PropTypes.func,
  clearTickets: React.PropTypes.func,
  selectAllTickets: React.PropTypes.func,
  handleTicketClick: React.PropTypes.func,
  deselectTicket: React.PropTypes.func,
  viewingProduct: React.PropTypes.func,
  fetchProducts: React.PropTypes.func,
  handleBuyClick: React.PropTypes.func,
  fetchRoundById: React.PropTypes.func
};

// <ListItem disabled>
// email: { this.state.userinfo.local.email || 'none'}
// </ListItem>
// <ListItem disabled>
// Facebook name: { this.state.userinfo.facebook.fullname || 'not linked' }
// </ListItem>
// <ListItem disabled>
// Facebook id: { this.state.userinfo.facebook.id || 'not linked'}
// </ListItem>
// <ListItem disabled>
// Vk name: { this.state.userinfo.vk.fullname || 'not linked' }
// </ListItem>
// <ListItem disabled>
// Vk id: { this.state.userinfo.vk.id || 'not linked' }
// </ListItem>

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
