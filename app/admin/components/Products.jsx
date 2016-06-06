import React from 'react';
import {Table, TableRow, TableBody, TableFooter, TableHeader, TableRowColumn, TableHeaderColumn, FlatButton} from 'material-ui';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class Products extends React.Component {
  componentWillMount = () => {
    this.props.fetchProducts();
  }
  handleSubmit = (e) => {
    let formData = new FormData(this.refs.productSubmit);
    this.props.submitProduct(formData);
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
      <div className={'admin__panel__content'}>
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
        <form action="javascript:void(0);" onSubmit={this.handleSubmit} ref="productSubmit">
          <label> Название </label>
          <input className={'form-control'} type="text" name="name" />
          <label> Цена </label>
          <input className={'form-control'} type="text" name="price" />
          <label> Описание </label>
          <input className={'form-control'} type="text" name="description" />
          <label> Изображение </label>
          <input className={'form-control'} type="file" name="picture" style={{height: '100%'}}/>
          <hr/>
          <button className={'btn btn-warning btn-lg'} bsSize={'small'} type="submit" disabled={this.props.state.productLoading}> Добавить </button>
          <img src="../../../public/images/ajax-loader.gif" style={this.props.state.productLoading ? {display: 'block'} : {display: 'none'}}/>
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
