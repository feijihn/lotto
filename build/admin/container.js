'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Main = require('./components/Main.jsx');

var _Main2 = _interopRequireDefault(_Main);

var _actions = require('./actions/actions.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    state: state
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: function fetchProducts() {
      dispatch((0, _actions.fetchProducts)());
    },
    fetchRounds: function fetchRounds() {
      dispatch((0, _actions.fetchRounds)());
    },
    fetchContent: function fetchContent() {
      dispatch((0, _actions.fetchContent)());
    }
  };
};

var AppContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Main2.default);

exports.default = AppContainer;