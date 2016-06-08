import React from 'react';
import IntroSection from './Sections/Intro/component.jsx';
import Products from './Sections/Products/component.jsx';
import AboutUs from './Sections/AboutUs/component.jsx';
import RoundSteps from './Sections/RoundSteps/component.jsx';

require('./style.scss');

export default  class IndexPage extends React.Component {
  render() {
    return (
      <div className={'indexPage col-lg-12 col-md-12 col-sm-12 section'}>
        <IntroSection />
        <RoundSteps />
        <Products />
        <AboutUs />
      </div>
    );
  }
}
