import React from 'react';
import Tile from './Tile.jsx';
import Rounds from './Rounds.jsx';
import RoundPage from './RoundPage.jsx';
import {Col} from 'react-bootstrap';
import {Image, Thumbnail} from 'react-bootstrap';
import {FlatButton} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    window.location.hash = 'round';
  }
  render() {
    return (
      <div className={'productsBlock'}>
        <Tile
        lg={12}
        md={12}
        sm={12}
        bgColor={Colors.lightBlue50}
        >
        <h1 style={{textAlign: 'center'}}>
          {this.props.state.viewingProduct[0].name}
        </h1>
          <Image src={this.props.state.viewingProduct[0].image} circle style={{width: 300, marginLeft: 10}} responsive />
          <p style={{marginLeft: 10, marginTop: 10, color: 'white'}}>Описание: {this.props.state.viewingProduct[0].description}</p>
        </Tile>
        <h1 style={{textAlign: 'center', color: '#FFFFFF'}}>
        Розыгрыш
        </h1>
        <Col lg={6} md={6}>
          <RoundPage handleTicketClick={this.props.handleTicketClick} state={this.props.state} handleBuyClick={this.props.handleBuyClick} deselectTicket={this.props.deselectTicket}/>
        </Col>
          <Tile
          lg={6}
          md={6}
          sm={6}
          height={500}
          bgColor={Colors.lightBlue100}
          >
          <h1 style={{textAlign: 'center', fontWeight: 900}}>
            Вы выбрали {this.props.state.markedTickets.length} билетов.<br/>
          </h1>
            <FlatButton label={'Купить'} backgroundColor={Colors.grey50} onTouchTap={this.props.handleBuyClick} style={{marginLeft: '40%'}}/>
          </Tile>
      </div>
    );
  }
}
