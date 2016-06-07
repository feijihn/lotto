import React from 'react';

import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui';

class RoundLegend extends React.Component {
  render() {
    return (
      <div className={'roundLegend col-lg-3 col-md-3 hidden-sm'}>
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


export default connect(
    mapStateToProps
)(RoundLegend);
