import React from 'react';
import {Link} from 'react-router';
import {Menu, MenuItem} from 'material-ui';

export default class AdminMenu extends React.Component {
  render() {
    return (
      <div className={'admin-panel__menu'}>
        <Menu className={'material-menu'}>
          <Link to={'/products'}>
            <MenuItem className={'material-menu__item'} primaryText={'Управление лотами'}>
            </MenuItem>
          </Link>
          <Link to={'/pages'}>
            <MenuItem className={'material-menu__item'} primaryText={'Управление страницами'}>
            </MenuItem>
          </Link>
        </Menu>
      </div>
    )
  }
}
