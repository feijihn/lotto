import React from 'react';
import RoundPic from './RoundPic.jsx';
import {List, ListItem, Avatar, Divider} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';

export default class Profile extends React.Component {
  componentDidMount = () => {
    let handle = setInterval(() => {
      this.context.store.roundHistory.forEach(round => {
        this.context.fetchTickets(round._id, true);
      });
      this.setState({
        handle: handle
      });
    }, 5000);
  }
  componentWillUnmount = () => {
    clearInterval(this.state.handle);
  }
  handleRoundClick = e => {
    console.log(e.target);
  }
  render() {
    let yourRounds = this.context.store.roundHistory.map((round, i) => {
      let tickets = [];
      for (let i in round.tickets) {
        if (round.tickets[i].user_id === this.context.store.userinfo._id) {
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
        <a href={'#/round/archive/' + round._id} key={i}>
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
        </a>
      );
    });
    if (this.context.store.roundHistory.length === 0) {
      yourRounds =
        <h2>
          Вы еще не участвовали ни в одном розыгрыше
        </h2>;
    }
    return (
      <div className={'profilePage col-lg-6 col-lg-offset-3'}>
      <h1 style={{textAlign: 'center', color: 'black'}}>
      Профиль
      </h1>
      <Avatar size={128} style={{margin: 10}}>{this.context.store.userinfo.local.username[0]}</Avatar>
      <span>Имя пользователя: {this.context.store.userinfo.local.username}<br/>
      Email: {this.context.store.userinfo.local.email}</span>
      <Divider/>
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
