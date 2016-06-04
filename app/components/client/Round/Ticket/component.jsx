import React from 'react';

import {connect} from 'react-redux';

import {Paper} from 'material-ui';

class Ticket extends React.Component {
  handleClick = () => {
    this.props.handleClick(this.props.id);
  };
  render() {
    return (
      <div
      className={'col-lg-10-12 col-md-10-12 col-sm-5-12 col-xs-4 ticket'}
      onClick={this.handleClick}
      style={{
        backgroundImage: 'url(' + this.props.bgImage + ')'
      }}
      >
        {this.props.children}
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
)(Ticket);
