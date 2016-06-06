import React from 'react';
import {Link} from 'react-router';
import {Menu, MenuItem} from 'material-ui';

export default class AdminMenu extends React.Component {
  render() {
    return (
      <div className={'admin__panel__menu'}>
        <Menu>
            <Link to={'/products'}>
              <MenuItem primaryText={'Управление лотами'}>
              </MenuItem>
            </Link>
            <Link to={'/pages'}>
              <MenuItem primaryText={'Редактирование главной'}>
              </MenuItem>
            </Link>
        </Menu>
      </div>
    )
  }
}
