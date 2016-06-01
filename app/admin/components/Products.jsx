import React from 'react';
import {Table, TableRow, TableBody, TableFooter, TableHeader, TableRowColumn, TableHeaderColumn, FlatButton} from 'material-ui';

export default class Products extends React.Component {
  render() {
    var products = this.context.store.products.map(prod => {
      return (
        <TableRow>
          <TableRowColumn>
            { prod._id }
          </TableRowColumn>
          <TableRowColumn>
            { prod.name }
          </TableRowColumn>
          <TableRowColumn>
            { prod.price }
          </TableRowColumn>
          <TableRowColumn>
            { prod.description }
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className={'adminPanel'}>
        <h1>Products</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
              ID
              </TableHeaderColumn>
              <TableHeaderColumn>
              Name
              </TableHeaderColumn>
              <TableHeaderColumn>
              Price
              </TableHeaderColumn>
              <TableHeaderColumn>
              Description
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products}
          </TableBody>
        </Table>
        <form action="/addproduct" method="post">
          <label> Название </label>
          <input className={'form-control'} type="text" name="name" />
          <label> Цена </label>
          <input className={'form-control'} type="text" name="price" />
          <label> Описание </label>
          <input className={'form-control'} type="text" name="description" />
          <label> Ссылка на изображение </label>
          <input className={'form-control'} type="text" name="imagelink" />
          <button className={'btn btn-warning btn-lg'} bsSize={'small'} type="submit"> Добавить </button>
        </form>
      </div>
        );
  }
}
