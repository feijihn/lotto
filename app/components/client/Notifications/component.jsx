import React from 'react';
import Notification from './Notification/component.jsx';
import {List, ListItem, Avatar} from 'material-ui';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions.js';

class Notifications extends React.Component {
  render() {
    let rawNots = this.props.state.userinfo.messages || [];
    let nots = rawNots.reverse().map(message => {
      let time = new Date(message.time);
      return (
        <Notification
          message={message}
          time={time}
          id={message._id}
          status={message.status}
          handleAlertRead={this.props.handleAlertRead}
        />
      );
    });
    if (nots.length === 0) {
      nots = <h2>У вас еще нет уведомлений</h2>;
    }
    return (
      <div className={'notifications__wrapper'}>
        <div className={'notifications__block col-lg-6 col-md-8 col-sm-12 col-lg-offset-3 col-md-offset-2'}>
            <h1 style={{textAlign: 'center'}}>
              Уведомления
            </h1>
            <List>
              {nots}
            </List>
        </div>
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
)(Notifications);
