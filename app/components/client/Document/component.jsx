import React from 'react';

export default class Document extends React.Component {
  render(){
    return (
     <div className={'document'}>
      <div className={'document__wrapper col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12'}>
        <div className={'document__body'}>
        </div>
      </div>
     </div> 
    )
  }
}
