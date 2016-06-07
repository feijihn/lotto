import React from 'react';
import {Snackbar, Dialog, FlatButton, RaisedButton, Stepper, Step, StepLabel} from 'material-ui';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../../actions/actions.js';

export default class RoundCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      paymentFormOpened: false
    };
  }
  handleBuyClick = () => {
    if (this.props.state.loggedIn) {
      this.props.ownTickets(this.props.state.markedTickets, this.props.state.round._id);
      this.props.fetchTickets(this.props.state.round._id);
    } else {
      this.setState({
        open: true
      });
    }
  }
  togglePaymentForm = () => {
    this.setState({
      paymentFormOpened: !this.state.paymentFormOpened
    });
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  }
  render() {
    const paymentActions = [
      <FlatButton
        label="Закрыть"
        primary={true}
        onTouchTap={this.togglePaymentForm}
      />
    ];
    return (
      <div className={'roundCheque col-lg-3 col-md-3'}>
        <h1>
          Вы выбрали <br/> <span> {this.props.state.markedTickets.length}</span> <br/> билетов <br/>
        </h1>
        <button
         className={'btn btn-lg btn-primary text-center buyButton'}
         onClick={() => {
           this.handleBuyClick();
           this.togglePaymentForm();
         }}
        >
          <span>Купить</span><br/>
        </button>
        <button
          className={'btn btn-lg btn-danger selectAllButton'}
         onClick={this.props.selectAllTickets}
        >
          <span>Выделить все</span>
        </button>
        <Snackbar
          className={'snackbar'}
          open={this.state.open}
          message="Для покупки билетов войдите или зарегистрируйтесь"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Dialog
         title={'Оплата'}
         actions={paymentActions}
         open={this.state.paymentFormOpened && this.props.state.loggedIn}
         bodyStyle={{
           maxHeight: 'auto'
         }}
         >
          <HorizontalLinearStepper />
         </Dialog>
      </div>
    );
  }
}

class HorizontalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return '';
      case 1:
        return '';
      case 2:
        return '';
      default:
        return '';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Подтвердите покупку</StepLabel>
          </Step>
          <Step>
            <StepLabel>Введите платежную информацию</StepLabel>
          </Step>
          <Step>
            <StepLabel>Подтверждение от банка</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              Done!
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
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
)(RoundCheck);
