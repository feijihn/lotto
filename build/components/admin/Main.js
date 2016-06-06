'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

var _materialUi = require('material-ui');

var _colors = require('material-ui/styles/colors');

var Colors = _interopRequireWildcard(_colors);

var _reactBootstrap = require('react-bootstrap');

var _lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme');

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _getMuiTheme = require('material-ui/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminMain = function (_React$Component) {
  _inherits(AdminMain, _React$Component);

  function AdminMain(props) {
    _classCallCheck(this, AdminMain);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AdminMain).call(this, props));

    _this.getChildContext = function () {
      return {
        muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default),
        store: _this.props.state,
        fetchRounds: _this.props.fetchRounds,
        fetchProducts: _this.props.fetchProducts
      };
    };

    _this.handleClick = function (value) {
      _this.setState({
        category: value
      });
    };

    _this.props.fetchProducts();
    _this.props.fetchRounds();
    _this.props.fetchContent();
    return _this;
  }

  _createClass(AdminMain, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'adminPanel' },
        _react2.default.createElement(
          _reactBootstrap.Grid,
          { fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { lg: 2, style: { paddingTop: 50, height: '100vh' } },
              _react2.default.createElement(
                _materialUi.Menu,
                { style: { float: 'left', position: 'relative' } },
                _react2.default.createElement(
                  'a',
                  { href: '#/panel-products' },
                  _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Продукты' })
                ),
                _react2.default.createElement(
                  'a',
                  { href: '#/panel-rounds' },
                  _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Розыгрыши' })
                ),
                _react2.default.createElement(
                  'a',
                  { href: '#/panel-pages' },
                  _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Контент' })
                )
              )
            ),
            _react2.default.createElement(_reactBootstrap.Col, { lg: 10 })
          )
        )
      );
    }
  }]);

  return AdminMain;
}(_react2.default.Component);

AdminMain.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  store: _react2.default.PropTypes.object,
  fetchProducts: _react2.default.PropTypes.func,
  fetchRounds: _react2.default.PropTypes.func
};

_react2.default.Component.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  store: _react2.default.PropTypes.object,
  fetchProducts: _react2.default.PropTypes.func,
  fetchRounds: _react2.default.PropTypes.func
};

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AdminMain);