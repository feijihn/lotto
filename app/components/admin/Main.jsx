import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions.js';

import {Menu, MenuItem} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-bootstrap';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class AdminMain extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchProducts();
    this.props.fetchRounds();
    this.props.fetchContent();
  }
  getChildContext = () => {
    return {
      muiTheme: getMuiTheme(baseTheme),
      store: this.props.state,
      fetchRounds: this.props.fetchRounds,
      fetchProducts: this.props.fetchProducts
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
        <a href={'#/panel-products'}>
          <MenuItem primaryText={'Продукты'}>
          </MenuItem>
        </a>
        <a href={'#/panel-rounds'}>
          <MenuItem primaryText={'Розыгрыши'}>
          </MenuItem>
        </a>
        <a href={'#/panel-pages'}>
          <MenuItem primaryText={'Контент'}>
          </MenuItem>
        </a>
      </Menu>
      </Col>
      <Col lg={10}>
      </Col>
      </Row>
      </Grid>
      </div>
    );
  }
}

AdminMain.childContextTypes = {
  muiTheme: React.PropTypes.object,
  store: React.PropTypes.object,
  fetchProducts: React.PropTypes.func,
  fetchRounds: React.PropTypes.func
};

React.Component.contextTypes = {
  muiTheme: React.PropTypes.object,
  store: React.PropTypes.object,
  fetchProducts: React.PropTypes.func,
  fetchRounds: React.PropTypes.func
};

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
)(AdminMain);
