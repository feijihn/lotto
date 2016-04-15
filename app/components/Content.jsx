import React from 'react';
import Products from './Products.jsx';
import ProductPage from './ProductPage.jsx';
import AlertsPage from './AlertsPage.jsx';
import Profile from './Profile.jsx';
import {Location, Locations} from 'react-router-component';

export default class Content extends React.Component {
  render() {
    return (
    <Locations hash>
      <Location path="/" handler={<Products state={this.props.state} handleProductClick={this.props.handleProductClick}/>} />
      <Location path="/round" handler={<ProductPage state={this.props.state} handleTicketClick={this.props.handleTicketClick} handleBuyClick={this.props.hanleBuyClick} deselectTicket={this.props.deselectTicket}/>} />
      <Location path="alerts" handler={<AlertsPage state={this.props.state}/>} />
      <Location path="profile" handler={<Profile state={this.props.state}/>} />
    </Locations>
    );
  }
}
