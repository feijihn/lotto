import React from 'react';
import Products from './Products.jsx';
import ProductPage from './ProductPage.jsx';
import AlertsPage from './AlertsPage.jsx';
import Profile from './Profile.jsx';
import {Location, Locations} from 'react-router-component';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    console.log(window.location.hash);
    if (window.location.hash === '#_=_') {
      window.location.hash = '';
    }
  }
  render() {
    return (
    <Locations hash>
      <Location path="/" handler={<Products state={this.props.state} handleProductClick={this.props.handleProductClick} />} />
      <Location path="#_=_" handler={<Products state={this.props.state} handleProductClick={this.props.handleProductClick}/>} />
      <Location path="/round" handler={<ProductPage state={this.props.state} handleTicketClick={this.props.handleTicketClick} handleBuyClick={this.props.hanleBuyClick} deselectTicket={this.props.deselectTicket} fetchTickets={this.props.fetchTickets}/>} />
      <Location path="/alerts" handler={<AlertsPage handleAlertRead={this.props.handleAlertRead}/>} />
      <Location path="alerts" handler={<AlertsPage handleAlertRead={this.props.handleAlertRead}/>} />
      <Location path="/profile" handler={<Profile state={this.props.state}/>} />
      <Location path="profile" handler={<Profile state={this.props.state}/>} />
    </Locations>
    );
  }
}
