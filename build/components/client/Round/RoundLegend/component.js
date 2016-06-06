'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoundLegend = function (_React$Component) {
  _inherits(RoundLegend, _React$Component);

  function RoundLegend() {
    _classCallCheck(this, RoundLegend);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RoundLegend).apply(this, arguments));
  }

  _createClass(RoundLegend, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'roundLegend col-lg-3 hidden-md hidden-sm' },
        _react2.default.createElement(
          _materialUi.List,
          null,
          _react2.default.createElement(
            _materialUi.ListItem,
            null,
            _react2.default.createElement(
              'h2',
              { style: { textAlign: 'center' } },
              ' Легенда '
            )
          ),
          _react2.default.createElement(
            _materialUi.ListItem,
            null,
            _react2.default.createElement('img', {
              src: '../../public/images/ballBlue.png',
              style: { width: 48, height: 48 }
            }),
            _react2.default.createElement(
              'p',
              null,
              ' Cвободный шар '
            )
          ),
          _react2.default.createElement(
            _materialUi.ListItem,
            null,
            _react2.default.createElement('img', {
              src: '../../public/images/ballPurple.png',
              style: { width: 48, height: 48 }
            }),
            _react2.default.createElement(
              'p',
              null,
              ' Выбранный шар '
            )
          ),
          _react2.default.createElement(
            _materialUi.ListItem,
            null,
            _react2.default.createElement('img', {
              src: '../../public/images/ballGreen.png',
              style: { width: 48, height: 48 }
            }),
            _react2.default.createElement(
              'p',
              null,
              ' Ваш шар '
            )
          ),
          _react2.default.createElement(
            _materialUi.ListItem,
            null,
            _react2.default.createElement('img', {
              src: '../../public/images/ballRed.png',
              style: { width: 48, height: 48 }
            }),
            _react2.default.createElement(
              'p',
              null,
              ' Чужой шар. '
            )
          )
        )
      );
    }
  }]);

  return RoundLegend;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(RoundLegend);