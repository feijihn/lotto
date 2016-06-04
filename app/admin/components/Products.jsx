import React from 'react';
import {Table, TableRow, TableBody, TableFooter, TableHeader, TableRowColumn, TableHeaderColumn, FlatButton} from 'material-ui';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class Products extends React.Component {
  componentWillMount = () => {
    this.props.fetchProducts();
  }
  render() {
    var products = this.props.state.products.map(prod => {
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
        <form action="/addproduct" method="post" encType="multipart/form-data">
          <label> Название </label>
          <input className={'form-control'} type="text" name="name" />
          <label> Цена </label>
          <input className={'form-control'} type="text" name="price" />
          <label> Описание </label>
          <input className={'form-control'} type="text" name="description" />
          <label> Изображение </label>
          <input className={'form-control'} type="file" name="picture" />
          <button className={'btn btn-warning btn-lg'} bsSize={'small'} type="submit"> Добавить </button>
        </form>
      </div>
        );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);
