import React from 'react';
import {Link} from 'react-router';
import {Menu, MenuItem} from 'material-ui';
import {SideNav, Nav} from 'react-sidenav';

var navigation = [
    { id: '', icon: 'glyphicon glyphicon-dashboard' , text: 'Главная'},
    { id: 'products', icon: 'glyphicon glyphicon-gift' , text: 'Лоты'},
    { id: 'pages', icon: 'glyphicon glyphicon-menu-down', text: 'Страницы' ,
        navlist: [
          { icon: 'glyphicon glyphicon-home', id: 'pages/index' ,text: 'Главная' },
          { icon: 'glyphicon glyphicon-list', id: 'pages/footer' ,text: 'Футер' }
        ]
    }
];

export default class AdminMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: ''
    }
  }
  handleSelection = (selection) => {
    this.setState({selection: selection.id});
    window.location.hash = selection.id;
  }
  render() {
    return (
      <div className={'admin-panel__menu'}>
        <SideNav selected={this.state.selection} navs={navigation} onSelection={this.handleSelection}/>
      </div>
    )
  }
}
