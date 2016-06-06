import React from 'react';

import {connect} from 'react-redux';

class AboutUs extends React.Component {
  render() {
    return (
      <div className={'aboutUsSection row'}>
        <div className={'col-lg-11 col-lg-offset-1 aboutUsContent'}>
            <div className={'aboutUsCaption caption'}>
              <h1 dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.reliabilitySection.header} :{__html: ''}}></h1>
              <p dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.reliabilitySection.text} :{__html: ''}}></p>
            </div>
             <button type="button" className={'btn btn-primary btn-lg securityButton'}><a href="#">Подробнее</a></button>
              <img src="../../public/images/flatlock.png"/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
    mapStateToProps
)(AboutUs);
