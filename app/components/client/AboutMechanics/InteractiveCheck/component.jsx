import React from 'react';

import DateTimeField from 'react-bootstrap-datetimepicker';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../../actions/mechanicsActions.js';
import moment from 'moment';

class InteractiveCheck extends React.Component {
  constructor(props) {
    super(props);
    let date = Math.floor(Date.now() / 1000) - 24000;
    this.state = {
      date: date,
      defaultDateString: moment(Date.now() - 24000000),
      roundId: ''
    }
    console.log(this.state.date);
    console.log(moment(this.state.date * 1000));
  };
  handleInput = (type) => {
    if (type === 'date') {
      this.refs.roundId.value = '';
      console.log(this.refs.date.getValue());
      this.setState({
        date: this.refs.date.value,
        roundId: ''
      });
    } else if (type === 'roundId') {
      this.refs.date.value = '';
      this.setState({
        roundId: this.refs.roundId.value,
        date: ''
      });
    }
  };
  handleDateChange = (newDate) => {
    this.refs.date.value = newDate;
    this.handleInput('date');
  }
  handleClick = () => {
    if (this.state.date) {
      this.props.checkDate(this.state.date);
    } else if (this.state.roundId) {
      this.props.checkRound(this.state.roundId);
    }
  };
  render() {
    return(
      <div className={'about-mechanics__interactive-check col-lg-6 col-md-6 col-sm-6'}>
        <div className={'about-mechanics__check-fields'}>
          <h3>Выберите дату и время</h3>
          <DateTimeField 
            onChange={this.handleDateChange} 
            ref="date"
            dateTime={this.state.defaultDateString}
            maxDate={this.state.defaultDateString}
            />
          <h3>Или введите id раунда для проверки</h3>
          <input type={'text'} className={'form-control field'} onInput={() => {
            this.handleInput('roundId');
          }} ref="roundId"/>
        </div>
        <button className={'btn btn-lg btn-info'} onTouchTap={() => { this.handleClick();
        }}>Проверить</button>
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
)(InteractiveCheck);
