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
  }
  render() {
    let total = 0;
    let transactions = this.props.state.transactions.map(transaction => {
      total = total + transaction;
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
      return (
        <li>
          {transactionString}
        </li>
      );
    });
    let transactionList;
    let totalLi = <li className={'total'} >{ String(total).substr(0, String(total).length - 9) + '.' + String(total).substr(String(total).length - 9, String(total).length) + ' BTC'}</li>;
    if (this.state.expanded) {
      transactionList = 
        <ul>
          {transactions}
          {totalLi}
          <li className={'expand__transactions'} onClick={this.handleExpandClick}><img src="public/images/collapse.png"/></li>
        </ul>
    } else {
      transactionList = 
        <ul>
            {transactions[0]}
            {transactions[1]}
            {transactions[2]}
            {transactions[3]}
            {transactions[4]}
            {transactions[5]}
            <li className={'expand__transactions'} onClick={this.handleExpandClick}><img src="public/images/more.png"/></li>
            {transactions[transactions.length - 5]}
            {transactions[transactions.length - 4]}
            {transactions[transactions.length - 3]}
            {transactions[transactions.length - 2]}
            {transactions[transactions.length - 1]}
            {totalLi}
        </ul>
    }

    return (
      <div className={'about-mechanics__transactions col-lg-6 col-md-6 col-sm-6'}>
        <img className={'about-mechanics__ajax-spinner'} src="public/images/gears.svg" style={this.props.state.dateChecking ? {display: 'block'} : {display: 'none'}}/>
        <div className={'about-mechanics__ruled-paper'} style={this.props.state.dateChecking ? {display: 'none'} : {display: 'block'}}>
          <div className={'vertical-ruler'}>
          </div>
          <img className={'plus'} src="public/images/plusIcon.png" />
            {transactionList}
        </div>
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
