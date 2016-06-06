import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions.js';

import RoundHistory from './RoundHistory/component.jsx';
import {List, ListItem, Avatar, Divider} from 'material-ui';
import {Link} from 'react-router';

class Profile extends React.Component {
  componentWillMount = () => {
    this.props.fetchRoundsArchive();
  }
  render() {
    return (
      <div className={'profile__wrapper'}>
      <div className={'profilePage col-lg-6 col-lg-offset-3'}>
        <h1 style={{textAlign: 'center', color: 'black'}}>
        Профиль
        </h1>
        <Avatar size={128} style={{margin: 10}}>
          {this.props.state.userinfo.local.username[0]}
        </Avatar>
        <span>
          Имя пользователя: {this.props.state.userinfo.local.username}<br/>
          Email: {this.props.state.userinfo.local.email}
        </span>
        <Divider/>
        <RoundHistory />
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
)(Profile);
