import React from 'react';
import {FlatButton, List, ListItem, Avatar, Paper, Divider, Badge, Dialog} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import Tile from './Tile.jsx';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormOpened: false,
      signupFormOpened: false
    };
  }
  componentWillMount = () => {
    this.context.fetchUserInfo();
  }
  toggleLoginForm = () => {
    this.setState({
      loginFormOpened: !this.state.loginFormOpened,
      signupFormOpened: false
    });
  }
  toggleSingupForm = () => {
    this.setState({
      signupFormOpened: !this.state.signupFormOpened,
      loginFormOpened: false
    });
  }
  render() {
    var content = <div></div>;
    switch (this.context.store.loggedIn) {
      case true:
        return (
          <div className={'header'}>
          <Paper
          style={{
            backgroundColor: Colors.deepPurple100,
            width: '100vw',
            padding: 10
          }}
          >
          <Avatar>{ this.props.userinfo.local.username.substr(0, 1) }</Avatar>
          <span className={'username'}style={{marginLeft: 20}}>{ this.props.userinfo.local.username }</span>
          <FlatButton
          label="Выйти"
          linkButton href={'/logout'}
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          />
          <FlatButton
          label="Уведомления"
          linkButton href={'#alerts'}
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          />
          <FlatButton
          label="Профиль"
          linkButton href={'#profile'}
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          />
          <FlatButton
          label="Главная"
          linkButton href={'#'}
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          />
          </Paper>
          </div>
        );
      case false:
        var loginActions = [
          <FlatButton
            label={'Закрыть'}
            onTouchTap={this.toggleLoginForm}
          />
        ];
        var signUpActions = [
          <FlatButton
            label={'Закрыть'}
            onTouchTap={this.toggleSingupForm}
          />
        ];
        return (
          <div className={'header'}>
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
                <button className={'btn btn-lg text-center'} type="submit">Зарегистрироваться</button>
              </form>
            </Dialog>
            <Dialog
            title={'Вход'}
            actions={loginActions}
            open={this.state.loginFormOpened}
            bodyStyle={{
              maxHeight: 'auto'
            }}
            >
              <h1 className={'text-center'}>Используйте аккаунт на сайте</h1>
              <form action="/login" method="post">
                <div className={'form-group'}>
                  <label>Email </label>
                  <input className={'form-control'} type="text" name="username"/><br/>
                </div>
                <div className={'form-group'}>
                  <label>Пароль </label>
                  <input className={'form-control'} type="password" name="password"/><br/>
                </div>
                <button className={'btn btn-lg text-center'} type="submit">Войти</button>
              </form>
              <Divider/>
              <h1 className={'text-center'}> ...или войдите, используя </h1><br/>
              <div className={'text-center'}>
              <a className={'btn btn-primary'} href="/auth/facebook">Facebook</a><span> </span>
              <a className={'btn btn-primary'} href="/auth/vkontakte">Вконтакте</a>
              </div>
            </Dialog>
          <Paper
          style={{
            backgroundColor: Colors.deepPurple100,
            width: '100vw',
            height: 50,
            paddingTop: 8
          }}
          >
          <FlatButton
          label="Войти"
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          onTouchTap={this.toggleLoginForm}
          />
          <FlatButton
          label="Зарегистрироваться"
          onTouchTap={this.toggleSingupForm}
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          />
          <FlatButton
          label="Главная"
          linkButton href={'#'}
          backgroundColor={Colors.white}
          style={{float: 'right', marginRight: 20}}
          />
          </Paper>
          </div>
        );
      default:
        return false;
    }
  }
}
