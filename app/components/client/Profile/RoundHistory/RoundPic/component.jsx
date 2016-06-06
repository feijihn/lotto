import React from 'react';

import {connect} from 'react-redux';


class RoundPic extends React.Component {
  componentDidUpdate = () => {
    this.generatePic(this.props.tickets);
  }
  generatePic = tickets => {
    let pixels = new Array(100 + 1).join('0').split('').map(parseFloat);
    for (var i in tickets) {
      if (tickets[i].user_id === this.props.state.userinfo._id) {
        pixels[tickets[i].value] = 2;
      }
      if (tickets[i].user_id !== this.props.state.userinfo._id) {
        pixels[tickets[i].value] = 1;
      }
    }
    let canv = this.refs.canvas;
    let ctx = canv.getContext('2d');
    canv.width = 120;
    canv.height = 120;
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        let rgba = '#000000';
        switch (pixels[i + j * 10]) {
          case 0:
            rgba = '#3D56A5';
            break;
          case 1:
            rgba = '#DC3A49';
            break;
          case 2:
            rgba = ' #4EB973';
            break;
          default:
            rgba = '#FF00FF';
        }
        ctx.beginPath();
        ctx.arc((i + 1) * 11, (j + 1) * 11, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = rgba;
        ctx.fill();
        // ctx.fillRect(i * 10, j * 10, 9, 9);
      }
    }
  }
  render() {
    return (
      <canvas ref={'canvas'}></canvas>
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
)(RoundPic);
