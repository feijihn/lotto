'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rounds = function (_React$Component) {
  _inherits(Rounds, _React$Component);

  function Rounds() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Rounds);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Rounds)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.componentWillMount = function () {
      _this.props.fetchRounds();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rounds, [{
    key: 'render',
    value: function render() {
      var rounds = this.props.state.rounds.map(function (rnd) {
        return _react2.default.createElement(
          _materialUi.TableRow,
          null,
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            rnd._id
          ),
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            rnd.product_id
          ),
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            rnd.startTime
          ),
          _react2.default.createElement(
            _materialUi.TableRowColumn,
            null,
            rnd.description
          )
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'adminPanel' },
        _react2.default.createElement(
          'h1',
          null,
          'Rounds'
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
                'Assoc. Product'
              ),
              _react2.default.createElement(
                _materialUi.TableHeaderColumn,
                null,
                'Start Date'
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
            rounds
          )
        ),
        _react2.default.createElement(
          'form',
          { action: '/addround', method: 'post' },
          _react2.default.createElement(
            'label',
            null,
            ' Продукт '
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'prodId' }),
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

  return Rounds;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Rounds);