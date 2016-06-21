import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class Index extends React.Component {
  componentWillMount = () => {
    this.props.fetchContent();
  }
  render() {
    return (
      <div className={'admin-panel__content'}>
         <h1>Добро пожаловать в админочку...</h1>
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
