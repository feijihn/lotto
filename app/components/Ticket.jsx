import React from 'react';
import {Paper} from 'material-ui';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1,
      zIndex: '0'
    };
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
      zIndex: '0'
    });
  };
  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
      zIndex: '999'
    });
  };
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
