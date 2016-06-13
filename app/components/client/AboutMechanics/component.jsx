import React from 'react';

import $ from 'jquery';

import Description from './Description/component.jsx';
import Transactions from './Transactions/component.jsx';
import InteractiveCheck from './InteractiveCheck/component.jsx';

require('./style.scss');

export default class AboutMechanics extends React.Component {
  componentDidMount = () => {
    $('html, body').animate({
        scrollTop: 0
    }, 750);
  }
  render() {
    return (
     <div className={'about-mechanics'}>
      <div className={'about-mechanics__wrapper col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12'}>
        <Description />
        <div className={'about-mechanics__transactions-check__wrapper col-lg-12 col-md-12 col-sm-12 block'}>
          <Transactions />
          <InteractiveCheck />
        </div>
      </div>
     </div> 
    );
  }
}
