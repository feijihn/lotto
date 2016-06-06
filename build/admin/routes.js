'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Main = require('./components/Main.jsx');

var _Main2 = _interopRequireDefault(_Main);

var _Index = require('./components/Index.jsx');

var _Index2 = _interopRequireDefault(_Index);

var _Products = require('./components/Products.jsx');

var _Products2 = _interopRequireDefault(_Products);

var _Rounds = require('./components/Rounds.jsx');

var _Rounds2 = _interopRequireDefault(_Rounds);

var _Pages = require('./components/Pages.jsx');

var _Pages2 = _interopRequireDefault(_Pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/admin-panel', component: _Main2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Index2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin-panel/products', component: _Products2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin-panel/rounds', component: _Rounds2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin-panel/pages', component: _Pages2.default })
);