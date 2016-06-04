import React from 'react';
import {Link} from 'react-router';
import {Menu, MenuItem} from 'material-ui';

export default class AdminMenu extends React.Component {
  render() {
    return (
      <div className={'admin__panel__menu'}>
        <Menu>
            <Link to={'/admin-panel/products'}>
              <MenuItem primaryText={'Продукты'}>
              </MenuItem>
            </Link>
            <Link to={'/admin-panel/rounds'}>
              <MenuItem primaryText={'Розыгрыши'}>
              </MenuItem>
            </Link>
            <Link to={'/admin-panel/pages'}>
              <MenuItem primaryText={'Контент'}>
              </MenuItem>
            </Link>
        </Menu>
      </div>
    )
  }
}
