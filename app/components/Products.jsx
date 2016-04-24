import React from 'react';
import Tile from './Tile.jsx';
import Product from './Product.jsx';
import ProductPage from './ProductPage.jsx';
import {Panel} from 'react-bootstrap';
import {Divider, Colors} from 'material-ui';

export default class Products extends React.Component {
  handleProductClick = id => {
    this.props.handleProductClick(id);
  };
  render() {
    let products = this.context.store.products.map(product => {
      let imageLink = product.image;
      let imageLabel = product.name;
      return (
        <Product
        lg={3}
        md={4}
        sm={6}
        xs={12}
        height={250}
        bgImageLink={imageLink}
        handleClick={this.handleProductClick}
        id={product._id}
        >
        <p className={'tileLabel'}>
        {imageLabel}
        </p>
        </Product>
      );
    });
    return (
      <div className={'productsBlock'}>
      <Tile
      lg={12}
      md={12}
      sm={12}
      height={800}
      bgColor={Colors.purple50}
      >
      <h1 style={{textAlign: 'center', backgroundColor: Colors.blueGrey400, padding: 10, color: 'white'}}>
      Лоты
      </h1>
      { products }
      </Tile>
      </div>
    );
  }
}
