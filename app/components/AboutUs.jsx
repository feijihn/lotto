import React from 'react';
import Tile from './Tile.jsx';
import * as Colors from 'material-ui/styles/colors';

export default class AboutUs extends React.Component {
  render() {
    return (
      <Tile
        lg={12}
        height={400}
        bgColor={Colors.lime300}
      >
      <h1 style={{textAlign: 'center', backgroundColor: Colors.deepOrange300, padding: 10, color: 'white'}}>
      О нас
      </h1>
      </Tile>
    );
  }
}
