import React from 'react';
import Tile from './Tile.jsx';
import * as Colors from 'material-ui/styles/colors';

export default class AboutUs extends React.Component {
  render() {
    return (
      <div className={'aboutUsSection row'}>
        <div className={'col-lg-11 col-lg-offset-1 aboutUsContent'}>
            <div className={'aboutUsCaption caption'} dangerouslySetInnerHTML={{__html: this.context.store.securityText}}>
            </div>
             <button type="button" className={'btn btn-primary btn-lg securityButton'}><a href="#">Подробнее</a></button>
              <img src="../../public/images/flatlock.png"/>
        </div>
      </div>
    );
  }
}
