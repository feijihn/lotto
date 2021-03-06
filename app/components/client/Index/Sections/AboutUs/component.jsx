import React from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';

class AboutUs extends React.Component {
  render() {
    return (
      <div className={'aboutus section col-lg-12 col-md-12 col-sm-12 col-xs-12 section'} id="aboutUsSection">
        <div className={'col-lg-8 col-md-7 col-sm-7 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 aboutus__content'}>
              <h1 className={'title'} dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.reliabilitySection.header} :{__html: ''}}></h1>
              <p className={'paragraph'} dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.reliabilitySection.text} :{__html: ''}}></p>
             <Link to="/mechanics"><button type="button" className={'btn btn-primary btn-lg'}>Подробнее</button></Link>
        </div>
        <div className={'col-lg-3 col-md-4 col-sm-4'}>
          <img className={'aboutus__image'} src="../../public/images/flatlock.png"/>
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
