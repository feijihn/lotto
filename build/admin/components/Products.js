'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Products = function (_React$Component) {
  _inherits(Products, _React$Component);

  function Products() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Products);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Products)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.componentWillMount = function () {
      _this.props.fetchProducts();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Products, [{
    key: 'render',
    value: function render() {
      var products = this.props.state.products.map(function (prod) {
        return _react2.default.createElement(
          _materialUi.TableRow,
          null,
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            prod._id
          ),
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            prod.name
          ),
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            prod.price
          ),
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            prod.description
          )
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'adminPanel' },
        _react2.default.createElement(
          'h1',
          null,
          'Products'
        ),
        _react2.default.createElement(
          _materialUi.Table,
          null,
          _react2.default.createElement(
            _materialUi.TableHeader,
            null,
            _react2.default.createElement(
              _materialUi.TableRow,
              null,
              _react2.default.createElement(
                _materialUi.TableHeaderColumn,
                null,
                'ID'
              ),
              _react2.default.createElement(
                _materialUi.TableHeaderColumn,
                null,
                'Name'
              ),
              _react2.default.createElement(
                _materialUi.TableHeaderColumn,
                null,
                'Price'
              ),
              _react2.default.createElement(
                _materialUi.TableHeaderColumn,
                null,
                'Description'
              )
            )
          ),
          _react2.default.createElement(
            _materialUi.TableBody,
            null,
            products
          )
        ),
        _react2.default.createElement(
          'form',
          { action: '/addproduct', method: 'post', encType: 'multipart/form-data' },
          _react2.default.createElement(
            'label',
            null,
            ' Название '
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'name' }),
          _react2.default.createElement(
            'label',
            null,
            ' Цена '
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'price' }),
          _react2.default.createElement(
            'label',
            null,
            ' Описание '
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'description' }),
          _react2.default.createElement(
            'label',
            null,
            ' Изображение '
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'file', name: 'picture' }),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-warning btn-lg', bsSize: 'small', type: 'submit' },
            ' Добавить '
          )
        )
      );
    }
  }]);

  return Products;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Products);