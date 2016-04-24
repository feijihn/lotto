import React from 'react';
import Tile from './Tile.jsx';
import RoundPage from './RoundPage.jsx';
import {Panel} from 'react-bootstrap';
import {Divider, Colors} from 'material-ui';

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
