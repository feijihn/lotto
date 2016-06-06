'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _component = require('./Product/component.jsx');

var _component2 = _interopRequireDefault(_component);

var _reactBootstrap = require('react-bootstrap');

var _materialUi = require('material-ui');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

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
      var products = this.props.state.products.map(function (product, i) {
        var imageLink = product.image;
        var imageLabel = product.name;
        return _react2.default.createElement(
          _component2.default,
          { id: product._id, ticketCost: product.price / 50, key: i },
          _react2.default.createElement(
            'span',
            { className: 'ticketCost' },
            product.price / 50,
            ' за билет'
          ),
          _react2.default.createElement('img', { src: imageLink }),
          _react2.default.createElement(
            'p',
            null,
            imageLabel
          )
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'productsSection row', id: 'rounds' },
        _react2.default.createElement(
          'h1',
          { className: 'section__title__black text-center' },
          'Лоты'
        ),
        products
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

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Products);