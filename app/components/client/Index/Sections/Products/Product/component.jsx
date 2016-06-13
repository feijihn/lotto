import React from 'react';
import {Link} from 'react-router';

export default class Product extends React.Component {
  render() {
    return (
        <div className={'product col-lg-3 col-md-3 col-sm-4 col-xs-12'}>
          {this.props.children}
          <Link to={'/round/' + this.props.id}>
            <button type="button" className={'btn btn-primary btn-lg'}><span>Выйграть</span></button>
          </Link>
        </div>
    );
  }
}
