import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';

class AboutUs extends React.Component {
  render() {
    return (
      <div className={'row'} id="aboutUsSection">
        <div className={'col-lg-8 col-md-7 col-sm-7 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 aboutUsContent'}>
            <div className={'aboutUsCaption caption'}>
              <h1 dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.reliabilitySection.header} :{__html: ''}}></h1>
              <p dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.reliabilitySection.text} :{__html: ''}}></p>
            </div>
             <Link to="/mechanics"><button type="button" className={'btn btn-primary btn-lg securityButton'}>Подробнее</button></Link>
        </div>
        <div className={'col-lg-3 col-md-4 col-sm-4'}>
          <img className={'aboutUsImage'} src="../../public/images/flatlock.png"/>
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
