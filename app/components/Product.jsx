import React from 'react';
import {Col} from 'react-bootstrap';
import {Paper} from 'material-ui';
import {Link} from 'react-router';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zDepth: 1,
      zIndex: '0'
    };
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
      zIndex: '0'
    });
  };
  handleMouseEnter = () => {
    this.setState({
      zDepth: 3,
      zIndex: '999'
    });
  };
  render() {
    return (
        <div className={'product'}>
          {this.props.children}
          <Link to={'/round/' + this.props.id}>
            <button type="button" className={'btn btn-primary btn-lg'}><span>Выйграть</span></button>
          </Link>
        </div>
    );
  }
}
