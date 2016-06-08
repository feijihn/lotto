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
          <span className={'ticketCost'}>{product.price / 50} за билет</span>
          <img src={imageLink}/>
          <p>{ imageLabel }</p>
        </Product>
      );
    });
    return (
      <div className={'products__section col-lg-12 col-md-12 col-sm-12 section'} id="rounds">
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
