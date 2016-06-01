import React from 'react';
import {Table, TableRow, TableBody, TableFooter, TableHeader, TableRowColumn, TableHeaderColumn, FlatButton} from 'material-ui';

export default class Rounds extends React.Component {
  render() {
    var rounds = this.context.store.rounds.map(rnd => {
      return (
        <TableRow>
          <TableRowColumn>
            { rnd._id }
          </TableRowColumn>
          <TableRowColumn>
            { rnd.product_id }
          </TableRowColumn>
          <TableRowColumn>
            { rnd.startTime }
          </TableRowColumn>
          <TableRowColumn>
            { rnd.description }
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div className={'adminPanel'}>
        <h1>Rounds</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
              ID
              </TableHeaderColumn>
              <TableHeaderColumn>
              Assoc. Product
              </TableHeaderColumn>
              <TableHeaderColumn>
              Start Date
              </TableHeaderColumn>
              <TableHeaderColumn>
              Description
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds}
          </TableBody>
        </Table>
        <form action="/addround" method="post">
          <label> Продукт </label>
          <input className={'form-control'} type="text" name="prodId" />
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
