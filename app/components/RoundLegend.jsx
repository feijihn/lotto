import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

import * as Colors from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui';

class RoundLegend extends React.Component {
  render() {
    return (
      <div className={'roundLegend col-lg-3 hidden-md hidden-sm'}>
        <List>
          <ListItem>
            <h2 style={{textAlign: 'center'}}> Легенда </h2>
          </ListItem>
          <ListItem>
            <img
             src="../../public/images/ballBlue.png"
             style={{width: 48, height: 48}}
            />
            <p> Cвободный шар </p>
          </ListItem>
          <ListItem>
            <img
             src="../../public/images/ballPurple.png"
             style={{width: 48, height: 48}}
             />
            <p> Выбранный шар </p>
          </ListItem>
          <ListItem>
            <img
             src="../../public/images/ballGreen.png"
             style={{width: 48, height: 48}}
            />
            <p> Ваш шар </p>
          </ListItem>
          <ListItem>
            <img
             src="../../public/images/ballRed.png"
             style={{width: 48, height: 48}}
            />
            <p> Чужой шар. </p>
          </ListItem>
        </List>
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
)(RoundLegend);
