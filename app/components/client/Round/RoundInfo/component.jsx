import React from 'react';

import {connect} from 'react-redux';

class RoundInfo extends React.Component {
  render() {
    let productInfo = this.props.state.products.map((product, i) => {
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
        <span className={'round-number'}>Уникальный id раунда: {this.props.state.round.publicId}</span>
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
)(RoundInfo);
