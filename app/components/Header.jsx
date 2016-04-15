import React from 'react';
import {FlatButton, List, ListItem, Avatar, Paper, Divider} from 'material-ui';
import Tile from './Tile.jsx';
var Colors = require('material-ui/lib/styles/colors');

export default class Header extends React.Component {
  render() {
    return (
      <div className={'header'}>
      <Paper
      style={{
        backgroundColor: Colors.lightBlue100,
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
  }
}
