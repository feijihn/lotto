import React from 'react';
import Tile from './Tile.jsx';
import {List, ListItem, Avatar, Divider} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';

export default class AlertsPage extends React.Component {
  render() {
    return (
      <div className={'profilePage'}>
        <Tile
        lg={12}
        md={12}
        sm={12}
        bgColor={Colors.lightBlue50}
        >
          <h1 style={{textAlign: 'center'}}>
            Профиль
          </h1>
          <Avatar size={128} style={{margin: 10}}>{this.props.state.userinfo.local.username[0]}</Avatar>
          <Divider/>
          <List>
            <ListItem>
              Имя пользователя: {this.props.state.userinfo.local.username}
            </ListItem>
            <ListItem>
              Email: {this.props.state.userinfo.local.email}
            </ListItem>
          </List>
        </Tile>
      </div>
    );
  }
}
