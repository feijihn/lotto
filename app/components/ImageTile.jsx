import React from 'react';
import {Col} from 'react-bootstrap';
import {Paper} from 'material-ui';

export default class ImageTile extends React.Component {
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
      <Col lg={this.props.lg || 12} md={this.props.md || 12} sm={this.props.sm || 12} lgOffset={this.props.lgOffset || 0} mdOffset={this.props.mdOffset || 0} smOffset={this.props.smOffset || 0} style={{zIndex: this.state.zIndex}}>
      <Paper
      zDepth={this.state.zDepth}
      style={{height: this.props.height || 100, zIndex: this.state.zIndex, backgroundImage: 'url(' + this.props.bgImageLink + ')' || 'none', backgroundSize: 'cover', cursor: 'pointer', backgroundColor: this.props.bgColor}}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      onTouchTap={this.handleClick}
      >
      {this.props.children}
      </Paper>
      </Col>
    );
  }
}
