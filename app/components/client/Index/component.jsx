import React from 'react';
import IntroSection from './Sections/Intro/component.jsx';
import Products from './Sections/Products/component.jsx';
import AboutUs from './Sections/AboutUs/component.jsx';
import RoundSteps from './Sections/RoundSteps/component.jsx';

export default  class IndexPage extends React.Component {
  render() {
    return (
      <div className={'indexPage'}>
        <IntroSection />
        <RoundSteps />
        <Products />
        <AboutUs />
      </div>
    );
  }
}
