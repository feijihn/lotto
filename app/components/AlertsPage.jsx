import React from 'react';
import Tile from './Tile.jsx';
import {List, ListItem, Avatar} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');

export default class AlertsPage extends React.Component {
  render() {
    let alerts = this.props.state.userinfo.messages.map(message => {
      return (
        <ListItem
        leftAvatar={<Avatar>{message.sender[0]}</Avatar>}
        primaryText={message.sender}
        secondaryText={message.body}
        />
      );
    });
    return (
      <div className={'alertsPage'}>
        <Tile
        lg={12}
        md={12}
        sm={12}
        bgColor={Colors.lightBlue50}
        >
          <h1 style={{textAlign: 'center'}}>
            Уведомления
          </h1>
          <List>
            {alerts}
          </List>
        </Tile>
      </div>
    );
  }
}
