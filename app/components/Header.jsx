import React from 'react';
import {FlatButton, List, ListItem, Avatar, Paper, Divider, Badge, Dialog} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import Tile from './Tile.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupFormOpened: false,
      avatarDropdownOpen: false,
      loginDropdownOpen: false
    };
  }
  componentWillMount = () => {
    this.context.fetchUserInfo();
  }
  toggleLoginDropdown = () => {
    this.setState({
      loginDropdownOpen: !this.state.loginDropdownOpen
    });
  }
  openSignupForm = () => {
    this.setState({
      signupFormOpened: !this.state.signupFormOpened
    });
  }
  toggleAvatarDropdown = () => {
    this.setState({
      avatarDropdownOpen: !this.state.avatarDropdownOpen
    });
  }
  render() {
    var content = <div></div>;
    switch (this.context.store.loggedIn) {
      case true:
        if (this.state.avatarDropdownOpen) {
          return (
            <div className={window.location.pathname === '/' ? 'headBar' : 'headBar sticky'}>
              <a href="/" className={'logo'}><h1>lotalot</h1></a>
            <div className={'headAvatar'}>
            <Avatar style={{
              background: 'transparent',
              border: '3px solid',
              boxSizing: 'content-box'
            }}>
                { this.context.store.userinfo.local.username.substr(0, 1) }
              </Avatar>
              <span className={'glyphicon glyphicon-chevron-down headAvatarChevron'} onClick={this.toggleAvatarDropdown}></span>
              </div>
              <div className={'avatarDropdown'}>
                <ul className={'dropdown-menu'}>
                  <li className={'dropdown-header'}>{this.context.store.userinfo.local.username}</li>
                  <li className={'divider'}></li>
                  <li><a href="#/profile"><span className={'glyphicon glyphicon-user'}/> Профиль</a></li>
                  <li><a href="#/alerts"><span className={'glyphicon glyphicon-bell'}/> Уведомления</a></li>
                  <li className={'divider'}></li>
                  <li><a href="/logout"><span className={'glyphicon glyphicon-log-out'}/> Выйти</a></li>
                </ul>
              </div>
            </div>
          );
        } else {
          return (
            <div className={window.location.pathname === '/' ? 'headBar' : 'headBar sticky'}>
              <a href="/" className={'logo'}><h1>lotalot</h1></a>
            <div className={'headAvatar'}>
              <Avatar style={{
                background: 'transparent',
                border: '3px solid',
                boxSizing: 'content-box'
              }}>
                { this.context.store.userinfo.local.username.substr(0, 1) }
              </Avatar>
              <span className={'glyphicon glyphicon-chevron-down headAvatarChevron'} onClick={this.toggleAvatarDropdown}></span>
              </div>
            </div>
          );
        }
      case false:
        if (this.state.loginDropdownOpen) {
          const signUpActions = [
            <FlatButton
              label="Закрыть"
              primary={true}
              onTouchTap={this.openSignupForm}
            />
          ];
          return (
            <div className={window.location.pathname === '/' ? 'headBar' : 'headBar sticky'}>
              <a href="/" className={'logo'}><h1>lotalot</h1></a>
                <button
                  type="button"
                  className={'btn btn-primary loginButton'}
                  onClick={this.toggleLoginDropdown}
                >
                  <span>Войти </span>
                </button>
                 <div className={'signInDropdown'}>
                  <ul className={'dropdown-menu'}>
                    <form action="/login" method="post" className={'signInForm'}>
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
                      <span>Еще нет аккаунта? <a onClick={this.openSignupForm} href="#">Регистрация</a></span>
                    </form>
                  </ul>
                </div>
                <Dialog
                 title={'Регистрация'}
                 actions={signUpActions}
                 open={this.state.signupFormOpened}
                 bodyStyle={{
                   maxHeight: 'auto'
                 }}
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
                 </Dialog>
              </div>
          );
        } else {
          return (
            <div className={window.location.pathname === '/' ? 'headBar' : 'headBar sticky'}>
              <a href="/" className={'logo'}><h1>lotalot</h1></a>
                <button
                  type="button"
                  className={'btn btn-default loginButton'}
                  onClick={this.toggleLoginDropdown}
                >
                  <span>Войти </span>
                </button>
            </div>
          );
        }
      default:
        return false;
    }
  }
}