import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {Paper, Avatar, List, ListItem, FlatButton, Divider} from 'material-ui';
var Colors = require('material-ui/lib/styles/colors');
import {Grid, Row, Col} from 'react-bootstrap';
import Tile from './Tile.jsx';
import App from '../reducers/reducers.js';
import { fetchUserInfo } from '../actions/actions.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUserInfo();
  }
  render() {
    return (
      <div className="main" style={{backgroundColor: '#512da8', height: '100%'}}>
      <Grid style={{padding: 20}}>
      <Row >
      <Tile
      lg={6}
      md={6}
      sm={12}
      bgColor={Colors.indigo500}
      >
      <List>
      <ListItem
      disabled
      leftAvatar={
        <Avatar >{ this.props.state.userinfo.local.username.substr(0,1) }</Avatar>
      }
      >
      { this.props.state.userinfo.local.username }
      <FlatButton label="Выйти" style={{position: 'absolute', top: 10, right: 10}} linkButton href={'/logout'} backgroundColor={Colors.indigo700}/>
      </ListItem>
      </List>
      </Tile>
      <Tile
      lg={3}
      md={4}
      sm={12}
      bgColor={Colors.purple500}
      >
      </Tile>
      <Tile
      lg={3}
      md={4}
      sm={12}
      bgColor={Colors.amber500}
      />
      <Tile
      lg={12}
      md={12}
      sm={12}
      height={800}
      bgColor={Colors.limeA400}
      />
      </Row>
      </Grid>
      </div>
    );
  }
}

// <ListItem disabled>
// email: { this.state.userinfo.local.email || 'none'}
// </ListItem>
// <ListItem disabled>
// Facebook name: { this.state.userinfo.facebook.fullname || 'not linked' }
// </ListItem>
// <ListItem disabled>
// Facebook id: { this.state.userinfo.facebook.id || 'not linked'}
// </ListItem>
// <ListItem disabled>
// Vk name: { this.state.userinfo.vk.fullname || 'not linked' }
// </ListItem>
// <ListItem disabled>
// Vk id: { this.state.userinfo.vk.id || 'not linked' }
// </ListItem>
