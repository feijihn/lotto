import React from 'react';
import { FlatButton } from 'material-ui';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  };
  render() {
    switch (this.props.category) {
      case 'index':
        return(
          <div className={'panel'}>
             <h1>This is Admin Panel</h1>
          </div>
        )
      case 'products':
        return(
          <div className={'panel'}>
            <h1>Products</h1>
            <form action="/addproduct" method="post">
            <label> Название </label>
            <input class="form-control" type="text" name="name" />
            <label> Цена </label>
            <input class="form-control" type="text" name="price" />
            <label> Описание </label>
            <input class="form-control" type="text" name="description" />
            <button class="btn btn-warning btn-lg" type="submit"> Добавить </button>
            </form>
          </div>
        )
      default:
        return(
          <div className={'panel'}>
            <h1>In dev.</h1>
          </div>
        )
    }
  }
}
