import React from 'react';
import Alert from './Alert.jsx';
import Tile from './Tile.jsx';
import {List, ListItem, Avatar} from 'material-ui';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class AlertsPage extends React.Component {
  render() {
    let rawAlerts = this.props.state.userinfo.messages;
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
)(AlertsPage);
