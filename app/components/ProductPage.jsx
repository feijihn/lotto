import React from 'react';
import Tile from './Tile.jsx';
import Rounds from './Rounds.jsx';
import RoundPage from './RoundPage.jsx';
import {Image, Thumbnail} from 'react-bootstrap';
var Colors = require('material-ui/lib/styles/colors');

export default class ProductPage extends React.Component {
  render() {
    return (
      <div className={'productsBlock'}>
        <Tile
        lg={12}
        md={12}
        sm={12}
        bgColor={Colors.grey200}
        >
        <h1 style={{textAlign: 'center'}}>
          {this.props.state.viewingProduct[0].name}
        </h1>
          <Image src={this.props.state.viewingProduct[0].image} circle style={{width: 300, marginLeft: 10}} responsive />
          <p style={{marginLeft: 10, marginTop: 10}}>Описание: {this.props.state.viewingProduct[0].description}</p>
        </Tile>
          <RoundPage handleTicketClick={this.props.handleTicketClick} state={this.props.state} handleBuyClick={this.props.handleBuyClick} deselectTicket={this.props.deselectTicket}/>
      </div>
    );
  }
}
