import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions.js';

import RoundCheck from './RoundCheck/component.jsx';
import RoundInfo from './RoundInfo/component.jsx';
import RoundLegend from './RoundLegend/component.jsx';
import Ticket from './Ticket/component.jsx';

import {FlatButton, Dialog, List, ListItem} from 'material-ui';

require('./style.scss');

class RoundPage extends React.Component {
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
    if (this.props.params.productId) {
      this.props.fetchProducts();
      this.props.fetchRounds(this.props.params.productId);
      let handle = setInterval(() => {
        this.props.fetchTickets(this.props.state.round._id);
      }, 10000);
      this.setState({
        fetchTicketsHandle: handle
      });
    } else if (this.props.params.roundId) {
      this.props.fetchRoundById(this.props.params.roundId);
      let handle = setInterval(() => {
        this.props.fetchTickets(this.props.params.roundId);
      }, 5000);
      this.setState({
        fetchTicketsHandle: handle
      });
    }
  }
  componentWillUnmount = () => {
    clearInterval(this.state.fetchTicketsHandle);
    this.props.clearTickets();
  }
  render() {
    let tickets = this.props.state.viewingTickets.map((value, i) => {
      if (i === this.props.state.winner) {
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
          handleClick={ value => this.props.claimTicket(value) }
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
          handleClick={ value => this.props.deselectTicket(value) }
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
    if (this.props.state.roundWaitingForWinner) {
      roundPage =
        <div className={'roundpage col-lg-10 col-md-12 col-sm-12 '}>
          <RoundLegend />
          <div className={'ticket-container col-lg-6 col-md-6 col-sm-8'}>
            <div className={'ticket-container__overlay'}>
            {tickets}
          </div>
          <h1>Выбираем победителя...</h1>
          </div>
          <RoundCheck />
        </div>;
    } else if (this.props.state.roundFinished) {
      roundPage =
        <div className={'round__page__wrapper'}>
        <div className={'roundContainer col-lg-10 col-md-12 col-sm-12'}>
        <RoundLegend />
        <div className={'ticketContainer col-lg-6 col-md-6 col-sm-8'}>
        <div className={'tickets__wrapper'}>
          {tickets}
        </div>
        <div className={'roundWaiting'}>
        </div>
        <h1>Раунд завершен! Выйграл билет №{this.props.state.winner}</h1>
        </div>
        <RoundCheck />
        </div>
        </div>;
    } else {
      roundPage =
        <div className={'roundpage col-lg-10 col-md-12 col-sm-12'}>
          <RoundLegend />
          <div className={'ticket-container col-lg-6 col-md-6 col-sm-8'}>
            {tickets}
          </div>
          <RoundCheck />
        </div>;
    }
    return (
        <div className={'roundpage-wrapper'}>
          <RoundInfo prodId={this.props.params.productId}/>
          <div className={'smallscreen-overlay'}>
            <h1>Ширина вашего экрана меньше поддерживаемой! Приносим свои извинения, скоро мы это исправим!</h1>
          </div>
          {roundPage}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoundPage);
