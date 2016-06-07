import React from 'react';

import ShortDescription from './Short/component.jsx';
import FullDescription from './Full/component.jsx';

export default class Description extends React.Component {
  render() {
    return (
      <div className={'about-mechanics__description'}>
        <ShortDescription />
        <FullDescription />
      </div>
    );
  }
}
