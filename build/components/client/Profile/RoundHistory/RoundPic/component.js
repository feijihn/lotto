'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../../../../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoundPic = function (_React$Component) {
  _inherits(RoundPic, _React$Component);

  function RoundPic() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RoundPic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RoundPic)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.componentDidUpdate = function () {
      _this.generatePic(_this.props.tickets);
    }, _this.generatePic = function (tickets) {
      var pixels = new Array(100 + 1).join('0').split('').map(parseFloat);
      for (var i in tickets) {
        if (tickets[i].user_id === _this.props.state.userinfo._id) {
          pixels[tickets[i].value] = 2;
        }
        if (tickets[i].user_id !== _this.props.state.userinfo._id) {
          pixels[tickets[i].value] = 1;
        }
      }
      var canv = _this.refs.canvas;
      var ctx = canv.getContext('2d');
      canv.width = 120;
      canv.height = 120;
      for (var _i = 0; _i < 10; _i += 1) {
        for (var j = 0; j < 10; j += 1) {
          var rgba = '#000000';
          switch (pixels[_i + j * 10]) {
            case 0:
              rgba = '#3D56A5';
              break;
            case 1:
              rgba = '#DC3A49';
              break;
            case 2:
              rgba = ' #4EB973';
              break;
            default:
              rgba = '#FF00FF';
          }
          ctx.beginPath();
          ctx.arc((_i + 1) * 11, (j + 1) * 11, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = rgba;
          ctx.fill();
          // ctx.fillRect(i * 10, j * 10, 9, 9);
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RoundPic, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('canvas', { ref: 'canvas' });
    }
  }]);

  return RoundPic;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoundPic);