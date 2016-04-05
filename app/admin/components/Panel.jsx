'use strict';
import React from 'react';
import { FlatButton } from 'material-ui';
import { Table, TableRow, TableRowColumn, TableHeader, TableHeaderColumn, TableBody, TableFooter } from 'material-ui';

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
        let products = this.props.state.products.map((prod) => {
          return(
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
          ) 
        })
        return(
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
        )
      case 'rounds':
        let rounds = this.props.state.rounds.map((rnd) => {
          return(
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
          ) 
        });
        return(
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
