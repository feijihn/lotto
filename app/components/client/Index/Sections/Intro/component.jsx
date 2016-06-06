import React from 'react';
import $ from 'jquery';

import {connect} from 'react-redux';


class IntroSection extends React.Component {
  scrollToRounds = () => {
    document.getElementById('rounds').scrollIntoView();
  }
  render() {
    return (
      <div className={'introSection row'}>
        <div className={'col-lg-10 col-lg-offset-1 text-center introContent'}>
            <div className={'introCaption caption'} >
              <h1 key="introkofwijeo" dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.introSection.header} :{__html: ''}}></h1>
              <p key="reliabliewkhew" dangerouslySetInnerHTML={this.props.state.content ? {__html: this.props.state.content.introSection.text} : {__html: ''}}></p>
            </div>
            <button className={'btn btn-lg btn-info'} onClick={this.scrollToRounds}><a href="#" id="playButton">Играть</a></button><br/>
            <span className={'introTrust'}>
               <span className={'handsIcon'}>
                  <img src="../../public/images/hands.png" width="32px" height="32px" />
                  Честно и надежно
               </span>
               <span className={'moreIcon'}>
                 <img src="../../public/images/more.png" width="32px" height="32px" />
                 <a href="#"> прочитайте подробнее</a>
               </span>
            </span>
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
