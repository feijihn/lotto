import React from 'react';
import Tile from './Tile.jsx';
import Product from './Product.jsx';
import ProductPage from './ProductPage.jsx';
import {Panel} from 'react-bootstrap';
import {Divider} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import {Link} from 'react-router';
 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class Products extends React.Component {
  handleProductClick = id => {
    this.props.handleProductClick(id);
  };
  render() {
    let products = this.props.state.products.map((product, i) => {
      let imageLink = product.image;
      let imageLabel = product.name;
      return (
        <Product id={product._id} handleClick={this.handleProductClick} ticketCost={product.price / 50} key={i}>
          <span className={'ticketCost'}>{product.price / 50} за билет</span>
          <img src={imageLink}/>
          <p>{ imageLabel }</p>
        </Product>
      );
    });
    return (
      <div className={'productsSection row'} id="rounds">
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);
