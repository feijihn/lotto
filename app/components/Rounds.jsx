import React from 'react';
import Tile from './Tile.jsx';
import ImageTile from './ImageTile.jsx';
import RoundPage from './RoundPage.jsx';
import {Panel} from 'react-bootstrap';
import {Divider} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');

export default class Rounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: 'overview',
      viewingRound: ''
    };
  }
  handleRoundClick = id => {
    this.setState({
      nav: 'round',
      viewingRound: id
    });
  };
  render() {
    let rounds = this.props.rounds.map(round => {
      if (round.product_id === this.props.prodId) {
        return (
          <ImageTile
          lg={3}
          md={4}
          sm={6}
          xs={12}
          height={200}
          handleClick={this.handleRoundClick}
          id={round._id}
          >
          <p className={'tileLabel'}>
          Розыгрыш #1
          </p>
          </ImageTile>
        );
      }
      return undefined;
    });
    return (
      {rounds}
    );
  }
}
