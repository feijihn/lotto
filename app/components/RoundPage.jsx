import React from 'react';
import {FlatButton, Dialog, List, ListItem} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import Ticket from './Ticket.jsx';
import Tile from './Tile.jsx';
import RoundInfo from './RoundInfo.jsx';
import RoundLegend from './RoundLegend.jsx';
import RoundCheque from './RoundCheque.jsx';
import {Col} from 'react-bootstrap';

export default class RoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    window.scrollTo(0, 100);
  }
  handleClose = () => {
    this.setState({
      open: false
    });
  }
  componentWillMount = () => {
    if (this.props.prodId) {
      this.context.fetchProducts();
      this.context.fetchRounds(this.props.prodId);
      let handle = setInterval(() => {
        this.context.fetchTickets(this.context.store.round._id);
      }, 5000);
      this.setState({
        fetchTicketsHandle: handle
      });
    } else if (this.props.roundId) {
      this.context.fetchRoundById(this.props.roundId);
      let handle = setInterval(() => {
        this.context.fetchTickets(this.props.roundId);
      }, 5000);
      this.setState({
        fetchTicketsHandle: handle
      });
    }
  }
  componentWillUnmount = () => {
    clearInterval(this.state.fetchTicketsHandle);
    this.context.clearTickets();
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
          key={i}
          >
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
          key={i}
          handleClick={ value => this.context.handleTicketClick(value) }
          >
          <span>
          {i}
          </span>
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
          key={i}
          >
          <span>
          {i}
          </span>
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
          key={i}
          >
          <span>
          {i}
          </span>
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
          key={i}
          handleClick={ value => this.context.deselectTicket(value) }
          >
          <span>
          {i}
          </span>
          </Ticket>
        );
      }
      return undefined;
    });
    let roundPage;
    if (this.context.store.roundWaitingForWinner) {
      roundPage =
        <div className={'roundPage row'}>
        <div className={'roundContainer col-lg-10 col-lg-offset-1'}>
        <RoundLegend />
        <div className={'ticketContainer col-lg-6'}>
        {tickets}
        <div className={'roundWaiting'}>
        </div>
        <h1>Выбираем победителя...</h1>
        </div>
        <RoundCheque />
        </div>
        </div>;
    } else if (this.context.store.roundFinished) {
      roundPage =
        <div className={'roundPage row'}>
        <div className={'roundContainer col-lg-10 col-lg-offset-1'}>
        <RoundLegend />
        <div className={'ticketContainer col-lg-6 roundFinished'}>
        {tickets}
        <div className={'roundWaiting'}>
        </div>
        <h1>Раунд завершен! Выйграл билет №{this.context.store.winner}</h1>
        </div>
        <RoundCheque />
        </div>
        </div>;
    } else {
      roundPage =
        <div className={'roundPage row'}>
        <div className={'roundContainer col-lg-10 col-lg-offset-1'}>
        <RoundLegend />
        <div className={'ticketContainer col-lg-6'}>
        {tickets}
        </div>
        <RoundCheque />
        </div>
        </div>;
    }
    return (
      <div>
        <RoundInfo prodId={this.props.prodId}/>
        {roundPage}
      </div>
    );
  }
}
