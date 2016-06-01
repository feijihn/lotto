import React from 'react';
import Alert from './Alert.jsx';
import Tile from './Tile.jsx';
import {List, ListItem, Avatar} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';

export default class AlertsPage extends React.Component {
  render() {
    let rawAlerts = this.context.store.userinfo.messages;
    let alerts = rawAlerts.reverse().map(message => {
      let time = new Date(message.time);
      return (
        <Alert
          message={message}
          time={time}
          id={message._id}
          status={message.status}
          handleAlertRead={this.props.handleAlertRead}
        />
      );
    });
    return (
      <div className={'alertsPage col-lg-6 col-md-8 col-sm-12 col-lg-offset-3 col-md-offset-2'}>
          <h1 style={{textAlign: 'center'}}>
            Уведомления
          </h1>
          <List>
            {alerts}
          </List>
      </div>
    );
  }
}
