import React from 'react';
import Tile from './Tile.jsx';
import ImageTile from './ImageTile.jsx';
import ProductPage from './ProductPage.jsx';
import {Panel} from 'react-bootstrap';
import {Divider} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');

export default class Products extends React.Component {
  handleProductClick = id => {
    this.props.handleProductClick(id);
  };
  render() {
    let products = this.props.state.products.map(product => {
      let imageLink = product.image;
      let imageLabel = product.name;
      return (
        <ImageTile
        lg={3}
        md={4}
        sm={6}
        xs={12}
        height={200}
        bgImageLink={imageLink}
        handleClick={this.handleProductClick}
        id={product._id}
        >
        <p className={'tileLabel'}>
        {imageLabel}
        </p>
        </ImageTile>
      );
    });
    return (
      <div className={'productsBlock'}>
      <Tile
      lg={12}
      md={12}
      sm={12}
      height={800}
      bgColor={Colors.grey200}
      >
      <h1 style={{textAlign: 'center', backgroundColor: Colors.blueGrey200, padding: 10, color: 'white'}}>
      Продукты
      </h1>
      { products }
      </Tile>
      </div>
    );
  }
}
