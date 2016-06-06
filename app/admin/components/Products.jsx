import React from 'react';
import {Table, TableRow, TableBody, TableFooter, TableHeader, TableRowColumn, TableHeaderColumn, FlatButton} from 'material-ui';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

class Products extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRow: undefined
    }
  }
  componentWillMount = () => {
    this.props.fetchProducts();
  }
  handleSubmit = (e) => {
    let formData = new FormData(this.refs.productSubmit);
    this.props.submitProduct(formData);
  }
  handleRowSelection = (selectedRows) => {
    this.setState({
      selectedRow: selectedRows[0]
    });
  }
  handleRemove = () => {
    this.props.removeProduct(this.props.state.products[this.state.selectedRow]._id);
  }
  render() {
    var products = this.props.state.products.map((prod, i) => {
      return (
        <TableRow
          selected={this.state.selectedRow === i}
        >
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
        <h1>Лоты</h1>
        <Table onRowSelection={this.handleRowSelection}>
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
        <button className={'btn btn-danger'} onTouchTap={this.handleRemove} disabled={this.state.selectedRow === undefined}>Удалить</button>
        <hr />
        <h2>Добавить новый лот</h2>
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
