import React from 'react';
import Tile from './Tile.jsx';
import Rounds from './Rounds.jsx';
import RoundPage from './RoundPage.jsx';
import {Col} from 'react-bootstrap';
import {Image, Thumbnail} from 'react-bootstrap';
import {FlatButton, List, ListItem} from 'material-ui';
import * as Colors from 'material-ui/styles/colors';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class ProductPage extends React.Component {
  render() {
    return (
      <div className={'productsBlock'}>
        <h1 style={{textAlign: 'center', color: '#FFFFFF', backgroundColor: Colors.purple100}}>
        </h1>
        <Tile
          lg={3}
          md={3}
          height={700}
          bgColor={Colors.purple50}
        >
        <List>
          <ListItem>
            <h2 style={{textAlign: 'center'}}> Легенда </h2>
          </ListItem>
          <ListItem>
            <img src="../../public/images/ballBlue.png" style={{width: 64, height: 64}}/>
            <p style={{color: Colors.blueA200, display: 'inline-block', backgroundColor: Colors.lightBlack, marginLeft: 5}}> СВОБОДНЫЙ </p> шар.
          </ListItem>
          <ListItem>
            <img src="../../public/images/ballPurple.png" style={{width: 64, height: 64}}/>
            <p style={{color: Colors.purpleA200, display: 'inline-block', backgroundColor: Colors.lightBlack, marginLeft: 5}}> ВЫБРАННЫЙ </p> шар.
          </ListItem>
          <ListItem>
            <img src="../../public/images/ballGreen.png" style={{width: 64, height: 64}}/>
            <p style={{color: Colors.greenA200, display: 'inline-block', backgroundColor: Colors.lightBlack, marginLeft: 5}}> ВАШ </p> шар.
          </ListItem>
          <ListItem>
            <img src="../../public/images/ballRed.png" style={{width: 64, height: 64}}/>
            <p style={{color: Colors.redA200, display: 'inline-block', backgroundColor: Colors.lightBlack, marginLeft: 5}}> ЧУЖОЙ </p> шар.
          </ListItem>
        </List>
        </Tile>
        <Col lg={6} md={6}>
          <RoundPage handleTicketClick={this.props.handleTicketClick} handleBuyClick={this.props.handleBuyClick} deselectTicket={this.props.deselectTicket} />
        </Col>
          <Tile
          lg={3}
          md={3}
          sm={3}
          height={700}
          bgColor={Colors.purple50}
          >
          <h1 style={{textAlign: 'center', fontWeight: 900, marginTop: '52.5%'}}>
            Вы выбрали <br/> <span style={{border: '1px solid black', padding: 3}}>{this.props.state.markedTickets.length}</span> <br/> билетов <br/>
          </h1>
            <FlatButton label={'Купить'} backgroundColor={Colors.grey50} onTouchTap={this.props.handleBuyClick} style={{display: 'block', margin: '0 auto'}}/>
            <FlatButton label={'Выделить все'} backgroundColor={Colors.grey50} onTouchTap={this.props.selectAllTickets} style={{display: 'block', margin: '0 auto'}}/>
          </Tile>
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
)(ProductPage);
