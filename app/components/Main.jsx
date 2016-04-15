import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Paper, Avatar, List, ListItem, FlatButton, Divider} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');
import {Grid, Row, Col} from 'react-bootstrap';
import Tile from './Tile.jsx';
import App from '../reducers/reducers.js';
import Products from './Products.jsx';
import Content from './Content.jsx';
import Header from './Header.jsx';
import {fetchUserInfo} from '../actions/actions.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUserInfo();
    this.props.fetchProducts();
    var handle = setInterval(handle => {
      this.ticketFetch(handle);
    }, 5000);
  }
  handleTicketClick = value => {
    this.props.claimTicket(value);
  };
  deselectTicket = value => {
    this.props.deselectTicket(value);
  };
  handleProductClick = id => {
    this.props.viewingProduct(id);
    this.props.fetchRounds(id);
    this.ticketFetch();
    window.location.hash = 'round';
  };
  ticketFetch = handle => {
    if (this.props.state.viewingRound._id && !this.props.state.roundFinished) {
      this.props.fetchTickets(this.props.state.viewingRound._id);
    }
    if (this.props.state.roundFinished) {
      clearInterval(handle);
      setTimeout(() => {
        window.location = '/profile';
      }, 10000);
    }
  };
  handleBuyClick = () => {
    this.props.ownTickets(this.props.state.markedTickets, this.props.state.viewingRound._id);
    this.props.fetchTickets(this.props.state.viewingRound._id);
  }
  handleAlertsClick = () => {
    this.props.viewAlerts();
  }
  render() {
    return (
      <div className="main" style={{backgroundColor: '#23314F', height: '100%'}}>
        <Header userinfo={this.props.state.userinfo || {}} handleAlertsClick={this.handleAlertsClick} />
          <Grid style={{padding: 20}}>
            <Row>
              <Content state={this.props.state} handleProductClick={this.handleProductClick} handleTicketClick={this.handleTicketClick} hanleBuyClick={this.handleBuyClick} deselectTicket={this.deselectTicket}/>
            </Row>
          </Grid>
      </div>
    );
  }
}

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
