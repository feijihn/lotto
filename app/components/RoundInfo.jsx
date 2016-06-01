import React from 'react';

export default class RoundInfo extends React.Component {
  render() {
    let productInfo = this.context.store.products.map((product, i) => {
      if (product._id === this.props.prodId) {
        return (
          <h1 key={i}>
            {product.name}
          </h1>
        );
      }
    });
    return (
      <div className={'round__info'}>
        {productInfo}
      </div>
    );
  }
}
