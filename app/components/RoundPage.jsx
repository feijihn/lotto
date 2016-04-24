import React from 'react';
import {FlatButton, Dialog} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import Ticket from './Ticket.jsx';
import Tile from './Tile.jsx';

export default class RoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  handleClose = () => {
    this.setState({
      open: false
    });
  }
  componentWillMount = () => {
    this.context.clearTickets();
    this.context.fetchRounds(this.context.store.product[0]._id);
    let handle = setInterval(() => {
      this.context.fetchTickets(this.context.store.round[0]._id);
    }, 5000);
    this.setState({
      fetchTicketsHandle: handle
    });
  }
  componentWillUnmount = () => {
    clearInterval(this.state.fetchTicketsHandle);
  }
  render() {
    let tickets = this.context.store.viewingTickets.map((value, i) => {
      if (i === this.context.store.winner) {
        return (
          <Ticket
          lg={2}
          md={1}
          sm={1}
          bgImage={'../../public/images/ballAmber.png'}
          id={i}
          >
          <h2 style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%'
          }}>
          !WIN!
          </h2>
          </Ticket>
        );
      }
      if (value === 0) {
        return (
          <Ticket
          lg={1}
          md={2}
          sm={3}
          bgImage={'../../public/images/ballBlue.png'}
          id={i}
          handleClick={ value => this.props.handleTicketClick(value) }
          >
          <h2 style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translate(-8%, -180%)',
            fontFamily: 'Flagship Slab',
            fontSize: 15,
            fontWeight: 400
          }}>
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
          bgImage={'../../public/images/ballRed.png'}
          id={i}
          >
          <h2 style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translate(-8%, -180%)',
            fontFamily: 'Flagship Slab',
            fontSize: 15,
            fontWeight: 400
          }}>
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
          bgImage={'../../public/images/ballGreen.png'}
          id={i}
          >
          <h2 style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translate(-8%, -180%)',
            fontFamily: 'Flagship Slab',
            fontSize: 15,
            fontWeight: 400
          }}>
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
          bgImage={'../../public/images/ballPurple.png'}
          id={i}
          handleClick={ value => this.props.deselectTicket(value) }
          >
          <h2 style={{
            textAlign: 'center',
            position: 'absolute',
            width: '100%',
            top: '50%',
            transform: 'translate(-8%, -180%)',
            fontFamily: 'Flagship Slab',
            fontSize: 15,
            fontWeight: 400
          }}>
          {i}
          </h2>
          </Ticket>
        );
      }
      return undefined;
    });
    if (!this.context.store.roundFinished) {
      return (
        <div className={'roundPage'}>
              {tickets}
        </div>
      );
    }
    if (this.context.store.roundFinished) {
      let actions = [
        <FlatButton
        label="Хорошо"
        primary={true}
        onTouchTap={this.handleClose}
        />
      ];
      return (
        <div className={'roundPage'}>
        {tickets}
        <Dialog
        title="Розыгрыш завершен!"
        actions={actions}
        modal={true}
        open={this.state.open}
        >
        Розыгрыш завершен. Выйгрышный билет: {this.context.store.winner}!<br />
        Вы будете перенаправлены на главную через некоторое время.
        </Dialog>
        </div>
      );
    }
  }
}
