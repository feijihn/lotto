'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Main = require('./components/client/Main.jsx');

var _Main2 = _interopRequireDefault(_Main);

var _component = require('./components/client/Index/component.jsx');

var _component2 = _interopRequireDefault(_component);

var _component3 = require('./components/client/Round/component.jsx');

var _component4 = _interopRequireDefault(_component3);

var _component5 = require('./components/client/Notifications/component.jsx');

var _component6 = _interopRequireDefault(_component5);

var _component7 = require('./components/client/Profile/component.jsx');

var _component8 = _interopRequireDefault(_component7);

var _component9 = require('./components/admin/Signup/component.jsx');

var _component10 = _interopRequireDefault(_component9);

var _Main3 = require('./components/admin/Main.jsx');

var _Main4 = _interopRequireDefault(_Main3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _Main2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _component2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/round/:prodId', component: _component4.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/round/archive/:roundId', componenr: _component4.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/notifications', component: _component6.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _component8.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _component10.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/panel', component: _Main4.default }),
  _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '404' })
);


module.exports.routes = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _Main2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _component2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/round/:prodId', component: _component4.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/round/archive/:roundId', componenr: _component4.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/notifications', component: _component6.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _component8.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _component10.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/panel', component: _Main4.default }),
  _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '404' })
);

