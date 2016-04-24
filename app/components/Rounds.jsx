import React from 'react';
import Tile from './Tile.jsx';
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
    return (
      false
    );
  }
}
