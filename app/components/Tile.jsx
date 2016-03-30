import React from 'react';
import {Col} from 'react-bootstrap';
import {Paper} from 'material-ui';

export default class Tile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      zDepth: 1,
      zIndex: '0',
    }
  };
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
      zIndex: '0',
    })
  };
  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
      zIndex: '999',
    })
  };

  handleClick = () => {

  };
  render(){
    return(
      <div className={'ratio'}>
      <div className={'sqaure'}>
      <Col lg={this.props.lg || 12} md={this.props.md || 12} sm={this.props.sm || 12} style={{padding:10, zIndex:this.state.zIndex}}>
      <Paper
      zDepth={this.state.zDepth}
      style={{height:this.props.height || 100, zIndex:this.state.zIndex, backgroundColor: this.props.bgColor || '#000000'}}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      >
      {this.props.children}
      </Paper>
      </Col>
      </div>
      </div>
    )
  }
}