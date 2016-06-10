import React from 'react';
import $ from 'jquery';

import {connect} from 'react-redux';

var scrollIntoView = require('scroll-into-view');


class IntroSection extends React.Component {
  handlePlayClick = () => {
    $('html, body').animate({
        scrollTop: $("#rounds").offset().top
    }, 750);
  }
  handleMoreClick = () => {
    $('html, body').animate({
        scrollTop: $("#aboutUsSection").offset().top
    }, 750);
  }
  render() {
    return (
      <div className={'intro__section col-lg-12 col-md-12 col-sm-12 section'}>
        <div className={'col-lg-10 col-lg-offset-1 text-center introContent'}>
            <div className={'introCaption caption'} >
              <h1 key="introkofwijeo" dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.introSection.header} :{__html: ''}}></h1>
              <p key="reliabliewkhew" dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.introSection.text} : {__html: ''}}></p>
            </div>
            <button className={'btn btn-lg btn-info'} onClick={this.handlePlayClick}><a href="#" id="playButton">Играть</a></button><br/>
            <div className={'col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 introTrust'}>
                 <span className={'col-lg-6 col-md-6 col-sm-6 handsIcon'}>
                    <img src="public/images/hands.png" width="32px" height="32px" />
                    Честно и надежно
                 </span>
                 <span className={'col-lg-6 col-md-6 col-sm-6 moreIcon'}>
                   <img src="public/images/about.png" width="32px" height="32px" />
                   <a onClick={this.handleMoreClick} href="javascript:void(0);"> прочитайте подробнее</a>
                 </span>
            </div>
        </div>
      </div>
    );
  }
}
/* <h1>Добро пожаловать в Lotalot! <span className={'label label-default'}>Alpha</span></h1>
<p>Кристально чистые и прозрачные розыгрыши всяких клёвых штук.<br/>
  Покупайте билеты и выигрывайте призы! Покупайте больше если не выйграли,<br/>
  если выйграли покупайте еще больше. Мы вам очень рады а еще больше будем рады,<br/>
  если вы купите билетов, так что покупайте поскорей! Выйграйте айфон и понтуйтесь<br/>
  перед друзьями в школе, выйграйте макбук и понтуйтесь перед друзьями в старбаксе!<br/>
  миллион возможностей только для вас! Спешите! Призы ограничены!
</p>*/

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
    mapStateToProps
)(IntroSection);
