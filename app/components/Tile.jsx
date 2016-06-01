import React from 'react';
import {Col} from 'react-bootstrap';
import {Paper} from 'material-ui';

export default class Tile extends React.Component {
  render() {
    return (
      <Col lg={this.props.lg || 12} md={this.props.md || 12} sm={this.props.sm || 12} style={{
        height: '100%'
      }}>
      <Paper
      >
      {this.props.children}
      </Paper>
      </Col>
    );
  }
}
