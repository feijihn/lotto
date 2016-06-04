import React from 'react';

export default class AdminSignup extends React.Component {
  render() {
    return (
      <div className={'admin__signup col-sm-6 col-sm-offset-3'}>
        <h1>Вход</h1>
        <form action="/admin" method="/post">
          <div className={'form-group'}>
            <label>Логин</label>
            <input className={'form-control'} type="text" name="username" />
          </div>
          <div className={'form-group'}>
            <label>Пароль</label>
            <input className={'form-control'} type="password" name="password" />
          </div>
          <button className={'btn btn-warning btn-lg'}>Войти</button>
        </form>
      </div>
    )
  }
}
