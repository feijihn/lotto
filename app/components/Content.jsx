import React from 'react';
import Products from './Products.jsx';
import ProductPage from './ProductPage.jsx';

export default class Content extends React.Component {
  render() {
    switch (this.props.state.nav) {
      case 'index':
        return (
          <Products state={this.props.state} handleProductClick={this.props.handleProductClick}/>
        );
      case 'productpage':
        return (
          <ProductPage state={this.props.state} handleTicketClick={this.props.handleTicketClick} handleBuyClick={this.props.hanleBuyClick} deselectTicket={this.props.deselectTicket}/>
        );
      default:
        return false;
    }
  }
}
