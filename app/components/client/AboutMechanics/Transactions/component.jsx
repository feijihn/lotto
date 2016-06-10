import React from 'react';

import {connect} from 'react-redux';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }
  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
    this.props.transactionsExpandToggle(this.state.expanded);
  }
  render() {
    let total = 0;
    let transactions = this.props.state.transactions.map(transaction => {
      let transactionString = String(transaction);
      if(transactionString.length < 9) {
        let addition = '';
        if (8 - transactionString.length) {
          addition = '0'.repeat(8 - transactionString.length);
        }
        transactionString = '0.' + transactionString + addition + ' BTC';
      } else if (transactionString.length === 9 ) {
        transactionString = transactionString[0] + '.' + transactionString.substr(1) + ' BTC';
      } else {
        transactionString = transactionString.substr(0, transactionString.length - 8) + '.' + transactionString.substr(transactionString.length - 8, transactionString.length) + ' BTC';
      }
      console.log(transactionString.substr(0, transactionString.length - 3));
      total = total + Number(transactionString.substr(0, transactionString.length - 3));
      return (
        <li>
          {transactionString}
        </li>
      );
    });
    let transactionList;
    let decoration = 
        <div className={'ruled-paper__decoration'}>
          <div className={'vertical-ruler'}>
          </div>
          <div className={'vertical-ruler ruler-2'}>
          </div>
          <div className={'ruled-paper__dot dot__0'}>
          </div>
          <div className={'ruled-paper__dot dot__1'}>
          </div>
          <div className={'ruled-paper__dot dot__2'}>
          </div>
          <div className={'ruled-paper__dot dot__3'}>
          </div>
        </div>;
    let totalLi = <li className={'total'} >{ total.toPrecision(9) + ' BTC'}</li>;
    if (this.state.expanded) {
      transactionList = 
        <div className={'about-mechanics__ruled-paper'} style={this.props.state.dateChecking ? {display: 'none'} : {display: 'block'}}>
            {decoration}
            <img className={'plus'} src="public/images/plusIcon.png" />
            <ul>
              {transactions}
              {totalLi}
              <li className={'expand__transactions'} onClick={this.handleExpandClick}><img src="public/images/collapse.png"/></li>
            </ul>
        </div>
    } else {
      transactionList = 
        <div className={'about-mechanics__ruled-paper__cutoff'}>
          <div className={'about-mechanics__ruled-paper ruled-paper__cut-bottom'}>
            {decoration}
            <img className={'plus'} src="public/images/plusIcon.png" />
            <ul>
              {transactions[0]}
              {transactions[1]}
              {transactions[2]}
              {transactions[3]}
              {transactions[4]}
              {transactions[5]}
            </ul>
          </div>
          <div className={'ruled-paper__expand'} onTouchTap={this.handleExpandClick}>
            <img src="public/images/more.png" />
          </div>
          <div className={'about-mechanics__ruled-paper ruled-paper__cut-top'}>
            {decoration}
            <ul>
              {transactions[transactions.length - 5]}
              {transactions[transactions.length - 4]}
              {transactions[transactions.length - 3]}
              {transactions[transactions.length - 2]}
              {transactions[transactions.length - 1]}
              {totalLi}
            </ul>
          </div>
        </div>;
    }

    return (
      <div className={this.props.state.transactionsExpandState ? 'about-mechanics__transactions col-lg-8 col-md-8 col-sm-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2' : 'col-lg-6 clo-md-6 col-sm-12 about-mechanics__transactions'}>
        <img className={'about-mechanics__ajax-spinner'} src="public/images/gears.svg" style={this.props.state.dateChecking ? {display: 'block'} : {display: 'none'}}/>
        {transactionList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(
  mapStateToProps
)(Transactions);
