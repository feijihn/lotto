import React from 'react';
import IntroSection from './IntroSection.jsx';
import Products from './Products.jsx';
import AboutUs from './AboutUs.jsx';
import RoundSteps from './RoundSteps.jsx';

export default class Index extends React.Component {
  render() {
    return (
      <div className={'indexPage'} id="lol">
        <IntroSection />
        <RoundSteps />
        <Products handleProductClick={this.context.handleProductClick}/>
        <AboutUs />
      </div>
    );
  }
}
