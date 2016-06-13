import React from 'react';

import {List, ListItem} from 'material-ui';
import {Link} from 'react-router';
import RoundPic from './RoundPic/component.jsx';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../..//actions/actions.js';

class RoundHistory extends React.Component {
  componentDidMount = () => {
    let handle = setInterval(() => {
      this.props.state.roundHistory.forEach(round => {
        this.props.fetchTickets(round._id, true);
      });
      this.setState({
        handle: handle
      });
    }, 15000);
  }
  componentWillUnmount = () => {
    if (this.state) {
      clearInterval(this.state.handle);
    }
  }
  render(){
    let yourRounds = this.props.state.roundHistory.map((round, i) => {
      let tickets = [];
      for (let i in round.tickets) {
        if (round.tickets[i].user_id === this.props.state.userinfo._id) {
          tickets.push(round.tickets[i].value);
        }
      }
      tickets.sort((a, b) => {
        return a - b;
      });
      let yourTickets = [];
      if (tickets.length === 1) {
        yourTickets.push(<span>{tickets[0]}</span>);
      } else {
        let k = 1;
        for (let j = 0; tickets[j + 1];) {
          if (tickets[j] - tickets[j + k] === -k) {
            k++;
          } else {
            if (k === 1) {
              yourTickets.push(<span>{tickets[j]}  </span>);
            } else if (k === 2) {
              yourTickets.push(<span>{tickets[j]}  {tickets[j + k]}  </span>);
            } else {
              yourTickets.push(<span>[{tickets[j]} - {tickets[j + k - 1]}]  </span>);
            }
            j += k;
            k = 1;
          }
        }
      }
      return (
        <Link to={'/round/archive/' + round._id} key={i}>
          <ListItem>
            <div className={'round__history__element row'}>
              <div className={'round__history__pic col-lg-2'}>
                <RoundPic tickets={round.tickets}/>
              </div>
              <div className={'round__history__description col-lg-10'}>
                <span>ID: {round._id}</span>
                <br/>
                <span>В раунде {round.tickets.length} билетов.</span>
                <br/>
                <span>Ваши билеты: {yourTickets}</span>
              </div>
            </div>
          </ListItem>
        </Link>
      );
    });
    if (this.props.state.roundHistory.length === 0) {
      yourRounds =
        <ListItem primaryText={'Вы еще не участвовали в розыгрышах'}>
        </ListItem>
    }
    return (
      <div className={'round__history__block'}>
        <h1 style={{textAlign: 'center', color: 'black'}}>
          Ваши розыгрыши
        </h1>
        <List>
          {yourRounds}
        </List>
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
)(RoundHistory);
