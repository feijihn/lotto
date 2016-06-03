import React from 'react';
import IntroSection from './IntroSection.jsx';
import Products from './Products.jsx';
import AboutUs from './AboutUs.jsx';
import RoundSteps from './RoundSteps.jsx';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class Index extends React.Component {
  render() {
    return (
      <div className={'indexPage'} id="lol">
        <IntroSection />
        <RoundSteps />
        <Products handleProductClick={this.props.handleProductClick}/>
        <AboutUs />
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
)(Index);
