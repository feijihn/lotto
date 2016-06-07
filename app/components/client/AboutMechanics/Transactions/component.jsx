import React from 'react';

export default class Transactions extends React.Component {
  render() {
    return (
      <div className={'about-mechanics__transactions'}>
        <div className={'about-mechanics__ruled-paper'}>
          <ul>
            <p>0.60686535 BTC</p>
            <hr />
            <li className={'plus'}>0.60686535 BTC</li>
            <hr />
            <li>0.60686535 BTC</li>
            <hr />
            <li>0.60686535 BTC</li>
            <hr />
            <li>0.60686535 BTC</li>
            <hr />
            <li>0.60686535 BTC</li>
            <hr />
            <li className={'total'} >3.61287312 BTC</li>
          </ul>
        </div>
      </div>
    );
  }
}
