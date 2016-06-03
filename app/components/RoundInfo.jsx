import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';


export default class RoundInfo extends React.Component {
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
)(RoundInfo);
