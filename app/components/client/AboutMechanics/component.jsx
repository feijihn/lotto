import React from 'react';

export default class AboutMechanics extends React.Component {
  render() {
    return (
     <div className={'about__mechanics__page'}>
      <Description />
      <Transactions />
      <InteractiveCheck />
     </div> 
    );
  }
}
