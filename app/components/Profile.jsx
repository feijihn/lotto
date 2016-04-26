import React from 'react';
import Tile from './Tile.jsx';
import {List, ListItem, Avatar, Divider} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';

const listItemStyle = {
  color: 'black'
};

export default class AlertsPage extends React.Component {
  render() {
    let yourRounds = this.context.store.roundHistory.map(round => {
      return (
        <Tile
          bgColor={'white'}
          lg={4}
          height={330}
          rounded={true}
        >
        </Tile>
      );
    });
    return (
      <div className={'profilePage'} style={listItemStyle}>
        <Tile
        lg={12}
        md={12}
        sm={12}
        bgColor={Colors.lightBlue50}
        >
          <h1 style={{textAlign: 'center', color: 'black'}}>
            Профиль
          </h1>
          <Avatar size={128} style={{margin: 10}}>{this.context.store.userinfo.local.username[0]}</Avatar>
          <Divider/>
          <List>
            <ListItem style={listItemStyle}>
              Имя пользователя: {this.context.store.userinfo.local.username}
            </ListItem>
            <ListItem style={listItemStyle}>
              Email: {this.context.store.userinfo.local.email}
            </ListItem>
          </List>
          <Divider/>
          <h1 style={{textAlign: 'center', color: 'black'}}>
            Ваши розыгрыши
          </h1>
          {yourRounds}
        </Tile>
      </div>
    );
  }
}
