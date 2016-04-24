import React from 'react';
import {Menu, MenuItem} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-bootstrap';
import Panel from './Panel.jsx';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';

injectTapEventPlugin();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'index'
    };
    this.props.fetchProducts();
    this.props.fetchRounds();
  }
  getChildContext = () => {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
  handleClick = value => {
    this.setState({
      category: value
    });
  };
  render() {
    return (
      <div className={'adminPanel'}>
      <Grid fluid>
      <Row>
      <Col lg={2} style={{paddingTop: 50, height: '100vh'}}>
      <Menu style={{float: 'left', position: 'relative'}}>
      <MenuItem primaryText={'Продукты'} onTouchTap={() => {
        this.handleClick('products');
      }} />
      <MenuItem primaryText={'Розыгрыши'} onTouchTap={() => {
        this.handleClick('rounds');
      }} />
      <MenuItem primaryText={'Пользователи'} onTouchTap={() => {
        this.handleClick('users');
      }} />
      </Menu>
      </Col>
      <Col lg={10}>
      <Panel category={this.state.category} state={this.props.state}/>
      </Col>
      </Row>
      </Grid>
      </div>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object
};
