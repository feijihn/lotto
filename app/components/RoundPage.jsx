import React from 'react';
import {FlatButton} from 'material-ui';
import Ticket from './Ticket.jsx';
import Tile from './Tile.jsx';
var Colors = require('material-ui/lib/styles/colors');

export default class RoundPage extends React.Component {
  render() {
    let tickets = this.props.state.viewingTickets.map((value, i) => {
      if (value === 0) {
        return (
          <Ticket
          lg={1}
          md={2}
          sm={3}
          height={75}
          bgColor={Colors.white}
          id={i}
          handleClick={ value => this.props.handleTicketClick(value) }
          >
          <h2 style={{textAlign: 'center'}}>
          {i}
          </h2>
          </Ticket>
        );
      }
      if (value === 1) {
        return (
          <Ticket
          lg={1}
          md={2}
          sm={3}
          height={75}
          bgColor={Colors.red100}
          id={i}
          >
          <h2 style={{textAlign: 'center'}}>
          {i}
          </h2>
          </Ticket>
        );
      }
      if (value === 2) {
        return (
          <Ticket
          lg={1}
          md={2}
          sm={3}
          height={75}
          bgColor={Colors.green100}
          id={i}
          >
          <h2 style={{textAlign: 'center'}}>
          {i}
          </h2>
          </Ticket>
        );
      }
      if (value === 3) {
        return (
          <Ticket
          lg={2}
          md={1}
          sm={1}
          height={75}
          bgColor={Colors.amber100}
          id={i}
          handleClick={ value => this.props.deselectTicket(value) }
          >
          <h2 style={{textAlign: 'center'}}>
          {i}
          </h2>
          </Ticket>
        );
      }
      return undefined;
    });
    return (
      <div className={'roundPage'}>
      <Tile
      bgColor={Colors.grey500}
      >
      <h1 style={{textAlign: 'center'}}>
      Розыгрыш
      </h1>
      {tickets}
      <div className={'buyTickets'}>
      Вы выбрали {this.props.state.markedTickets.length} билетов.<br/>
      <FlatButton label={'Купить'} backgroundColor={Colors.grey50} onTouchTap={this.props.handleBuyClick}/>
      </div>
      </Tile>
      </div>
    );
  }
}
