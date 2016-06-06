'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__INITIAL_STATE__;
var store = (0, _configureStore2.default)();
var rootElement = document.getElementById('container');
var ComponentEl = void 0;

if (process.env.NODE_ENV === 'development') {
  var DevTools = require('./containers/DevTools').default;
  // If using routes
  ComponentEl = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default }),
    _react2.default.createElement(DevTools, null)
  );
} else {
  ComponentEl = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _routes2.default })
  );
}

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  ComponentEl
), rootElement);