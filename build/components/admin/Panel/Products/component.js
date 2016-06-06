'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Products = function (_React$Component) {
  _inherits(Products, _React$Component);

  function Products() {
    _classCallCheck(this, Products);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Products).apply(this, arguments));
  }

  _createClass(Products, [{
    key: 'render',
    value: function render() {
      var products = this.context.store.products.map(function (prod) {
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
          { action: '/addproduct', method: 'post' },
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
            ' Ссылка на изображение '
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'imagelink' }),
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

exports.default = Products;