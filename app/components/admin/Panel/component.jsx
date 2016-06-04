'use strict';
import React from 'react';
import {FlatButton} from 'material-ui';

export default class Panel extends React.Component {
  render() {
    switch (this.props.category) {
      case 'index':
      case 'products':
      case 'rounds':
      default:
        return (
          <div className={'panel'}>
            <h1>In dev.</h1>
          </div>
        );
    }
  }
}
