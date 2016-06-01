import React from 'react';

export default class Canvas extends React.Component {
  componentDidMount = () => {
    var example = document.getElementById("example");
    var ctx = example.getContext('2d');
    example.width = 100;
    example.height = 100;
    for (let i = 0; i < 100; i += 10) {
      for (let j = 0; j < 100; j += 10) {
        let rgba = "rgba(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.random() + ")";
        console.log(rgba);
        ctx.fillStyle = rgba;
        ctx.fillRect(i, j, 10, 10);
      }
    }
  }
  render() {
    return (
      <canvas id="example"></canvas>
    );
  }
}
