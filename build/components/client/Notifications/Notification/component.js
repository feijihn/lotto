'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _colors = require('material-ui/styles/colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alert = function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert(props) {
    _classCallCheck(this, Alert);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Alert).call(this, props));

    if (_this.props.status === 'unread') {
      _this.state = {
        status: 'unread',
        bgColor: Colors.blue100
      };
    } else {
      _this.state = {
        status: 'read',
        bgColor: Colors.white
      };
    }
    setTimeout(function () {
      _this.setState({
        status: 'read'
      });
      _this.props.handleAlertRead(_this.props.id);
    }, 1500);
    return _this;
  }

  _createClass(Alert, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _materialUi.ListItem,
        {
          leftAvatar: _react2.default.createElement(
            _materialUi.Avatar,
            null,
            this.props.message.sender[0]
          ),
          primaryText: this.props.message.sender,
          secondaryText: this.props.message.body,
          style: {
            backgroundColor: this.state.bgColor
          }
        },
        _react2.default.createElement(
          'p',
          { style: { position: 'absolute', color: Colors.darkBlack, top: '5%', right: '5%', fontWeight: 600 } },
          this.props.time.getFullYear() + '/' + this.props.time.getMonth() + '/' + this.props.time.getDay() + ' ' + this.props.time.getHours() + ':' + this.props.time.getMinutes()
        )
      );
    }
  }]);

  return Alert;
}(_react2.default.Component);

exports.default = Alert;