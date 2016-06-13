import React from 'react';
import Product from './Product/component.jsx';

import {Panel} from 'react-bootstrap';
import {Divider} from 'material-ui';
import {Link} from 'react-router';
 
import {connect} from 'react-redux';

class Products extends React.Component {
  render() {
    let products = this.props.state.products.map((product, i) => {
      let imageLink = product.image;
      let imageLabel = product.name;
      return (
        <Product id={product._id} ticketCost={product.price / 50} key={i}>
          <span className={'product__ticket-cost'}>{product.price / 50} за билет</span>
          <div className={'product__image'} style={{backgroundImage: 'url(' + imageLink + ')'}}>
          </div>
          <h3 className={'product__title'}>{ imageLabel }</h3>
          <div className={'product__description'}>{product.description}</div>
        </Product>
      );
    });
    return (
      <div className={'products col-lg-12 col-md-12 col-sm-12 col-xs-12 section'} id="rounds">
        <h1 className={'section__title__black text-center'}>Лоты</h1>
        {products}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
    mapStateToProps
)(Products);
