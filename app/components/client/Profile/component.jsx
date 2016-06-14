import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions.js';

import RoundHistory from './RoundHistory/component.jsx';
import {List, ListItem, Avatar, Divider} from 'material-ui';
import {Link} from 'react-router';

require('./style.scss');

class Profile extends React.Component {
  componentWillMount = () => {
    this.props.fetchRoundsArchive();
  }
  render() {
    return (
      <div className={'profile-wrapper'}>
        <div className={'profile col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12'}>
          <h1 className={'profile__title'}>
            Профиль
          </h1>
          <Avatar className={'profile__avatar'} size="128">
            {this.props.state.userinfo.local.username[0]}
          </Avatar>
          <div className={'profile__info'}>
            Имя пользователя: {this.props.state.userinfo.local.username}<br/>
            Email: {this.props.state.userinfo.local.email}
          </div>
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
