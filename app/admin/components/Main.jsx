import React from 'react';
import { Menu, MenuItem } from 'material-ui';
import { Grid, Row, Col } from 'react-bootstrap';
import Panel from './Panel.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'index'
    }
  };
  handleClick = (value) => {
    this.setState({
      category: value
    }); 
  };
  addProduct = (value) => {

  };
  render() {
    return (
      <div className={'adminPanel'}>
        <Grid fluid>
          <Row>
            <Col lg={2}>
              <Menu style={{float: 'left', position: 'relative'}}>
                <MenuItem primaryText={'Продукты'} onTouchTap={() => {this.handleClick('products')}} />
                <MenuItem primaryText={'Розыгрыши'} onTouchTap={() => {this.handleClick('rounds')}} />
                <MenuItem primaryText={'Пользователи'} onTouchTap={() => {this.handleClick('users')}} /> 
              </Menu>
            </Col>
            <Col lg={10}>
              <Panel category={this.state.category} addProduct={this.addProduct}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
