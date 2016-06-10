import React from 'react';
import {FlatButton, List, ListItem, Avatar, Paper, Divider, Badge, Dialog} from 'material-ui';
import {Link} from 'react-router';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../../actions/actions.js';

require('./style.scss');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupFormOpen: false,
      headerDropdownOpen: false,
    };
    console.log(this.props);
  }
  componentWillMount = () => {
    this.props.fetchUserInfo();
  }
  toggleLoginDropdown = () => {
    this.props.toggleLoginDropdown(!this.props.state.loginDropdownOpen);
  }
  openSignupForm = () => {
    this.setState({
      signupFormOpen: !this.state.signupFormOpen
    });
  }
  toggleHeaderDropdown = () => {
    this.setState({
      headerDropdownOpen: !this.state.headerDropdownOpen
    });
  }
  render() {
    const signUpActions = [
      <FlatButton
        label="Закрыть"
        primary={true}
        onTouchTap={this.openSignupForm}
      />
    ];
    let logo = 
      <Link to="/" className={'header__logo'}>lotalot</Link>;
    let headerRight = 
      <button
        className={'header__login-button'}
        onClick={this.toggleLoginDropdown}
      >
        Вход
      </button>;
    let dropdown = '';
    let signUpDialog =
      <Dialog
       title={'Регистрация'}
       actions={signUpActions}
       open={this.state.signupFormOpen}
      >
        <form action="/signup" method="post">
          <div className={'form-group'}>
            <label>Логин </label>
            <input className={'form-control'} type="text" name="username"/><br/>
          </div>
          <div className={'form-group'}>
            <label>Email </label>
            <input className={'form-control'} type="text" name="email"/><br/>
          </div>
          <div className={'form-group'}>
            <label>Пароль </label>
            <input className={'form-control'} type="password" name="password"/><br/>
          </div>
          <button className={'btn btn-lg text-center btn-success'} type="submit">Зарегистрироваться</button>
        </form>
      </Dialog>;
    if (this.props.state.loggedIn) {
      headerRight = 
        <div className={'header__right'}>
          <Avatar className={'header__avatar'}>
           { this.props.state.userinfo.local.username.substr(0, 1) }
          </Avatar>
          <span className={'glyphicon glyphicon-chevron-down header__avatar-chevron'} onClick={this.toggleHeaderDropdown}></span>
        </div>;
    }
    if (this.state.headerDropdownOpen) {
      dropdown =
        <div className={'header__dropdown'}>
          <ul className={'dropdown-menu header__dropdown-menu'}>
            <li className={'dropdown__header'}>{this.props.state.userinfo.local.username}</li>
            <li className={'divider'}></li>
            <li><Link to={'/profile'}><span className={'glyphicon glyphicon-user'}/> Профиль</Link></li>
            <li><Link to={'/notifications'}><span className={'glyphicon glyphicon-bell'}/> Уведомления</Link></li>
            <li className={'divider'}></li>
            <li><a href="/logout"><span className={'glyphicon glyphicon-log-out'}/> Выйти</a></li>
          </ul>
        </div>
    }
    if (this.props.state.loginDropdownOpen) {
      dropdown =
        <div className={'sign-in'}>
          <ul className={'dropdown-menu'}>
            <form action="/login" method="post" className={'sign-in__form'}>
              <div className={'form-group'}>
                <label>Email </label>
                <input className={'form-control'} type="text" name="username"/><br/>
              </div>
              <div className={'form-group'}>
                <label>Пароль </label>
                <input className={'form-control'} type="password" name="password"/><br/>
              </div>
              <button className={'btn btn-lg text-center btn-success'} type="submit">Войти</button>
              <a href="/auth/facebook/">
                <img src="../../public/images/Facebook-48.png"/>
              </a>
              <a href="/auth/vkontakte/">
                <img src="../../public/images/Vk.com-48.png"/>
              </a>
              <li className={'divider'}></li>
              <span>Еще нет аккаунта? <a onClick={this.openSignupForm}>Регистрация</a></span>
            </form>
          </ul>
        </div>;
    }
    return (
      <header className={window.location.hash.match(/#\/\?+/) ? 'header_main' : ''}>
        {logo}
        {headerRight}
        {dropdown}
        {signUpDialog}
      </header>
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
)(Header);
