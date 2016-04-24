import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Paper, Avatar, List, ListItem, FlatButton, Divider} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Grid, Row, Col} from 'react-bootstrap';
import Tile from './Tile.jsx';
import App from '../reducers/reducers.js';
import Products from './Products.jsx';
import Content from './Content.jsx';
import Header from './Header.jsx';
import AboutUs from './AboutUs.jsx';
import {fetchUserInfo} from '../actions/actions.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Main extends React.Component {
  getChildContext = () => {
    return {
      store: this.props.state,
      fetchRounds: this.props.fetchRounds,
      fetchUserInfo: this.props.fetchUserInfo,
      fetchTickets: this.props.fetchTickets,
      clearTickets: this.props.clearTickets,
      muiTheme: getMuiTheme(baseTheme)
    };
  };
  componentDidMount = () => {
    this.props.fetchUserInfo();
    this.props.fetchProducts();
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
  handleProductClick = id => {
    this.props.fetchRounds(id);
    this.props.viewingProduct(id);
    window.location.hash = 'round';
  };
  handleBuyClick = () => {
    this.props.ownTickets(this.props.state.markedTickets, this.props.state.round[0]._id);
    this.props.fetchTickets(this.props.state.round[0]._id);
  }
  handleAlertRead = alertId => {
    this.props.markAlertAsRead(alertId);
  }
  render() {
    return (
      <div className="main" style={{backgroundColor: '#23314F', height: '100%'}}>
        <Header userinfo={this.props.state.userinfo || {}} handleAlertsClick={this.handleAlertsClick} />
          <Grid style={{padding: 20}}>
            <Row>
              <Content fetchTickets={this.props.fetchTickets} handleProductClick={this.handleProductClick} handleTicketClick={this.handleTicketClick} hanleBuyClick={this.handleBuyClick} deselectTicket={this.deselectTicket} handleAlertRead={this.handleAlertRead}/>
            </Row>
          </Grid>
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
  muiTheme: React.PropTypes.object
};

React.Component.contextTypes = {
  store: React.PropTypes.object,
  fetchRounds: React.PropTypes.func,
  fetchTickets: React.PropTypes.func,
  fetchUserInfo: React.PropTypes.func,
  clearTickets: React.PropTypes.func
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
