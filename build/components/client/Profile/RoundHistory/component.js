'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../../../..//actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoundHistory = function (_React$Component) {
  _inherits(RoundHistory, _React$Component);

  function RoundHistory() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, RoundHistory);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RoundHistory)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.componentDidMount = function () {
      var handle = setInterval(function () {
        _this.props.state.roundHistory.forEach(function (round) {
          _this.props.fetchTickets(round._id, true);
        });
        _this.setState({
          handle: handle
        });
      }, 5000);
    }, _this.componentWillUnmount = function () {
      clearInterval(_this.state.handle);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RoundHistory, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var yourRounds = this.props.state.roundHistory.map(function (round, i) {
        var tickets = [];
        for (var _i in round.tickets) {
          if (round.tickets[_i].user_id === _this2.props.state.userinfo._id) {
            tickets.push(round.tickets[_i].value);
          }
        }
        tickets.sort(function (a, b) {
          return a - b;
        });
        var yourTickets = [];
        if (tickets.length === 1) {
          yourTickets.push(_react2.default.createElement(
            'span',
            null,
            tickets[0]
          ));
        } else {
          var k = 1;
          for (var j = 0; tickets[j + 1];) {
            if (tickets[j] - tickets[j + k] === -k) {
              k++;
            } else {
              if (k === 1) {
                yourTickets.push(_react2.default.createElement(
                  'span',
                  null,
                  tickets[j],
                  '  '
                ));
              } else if (k === 2) {
                yourTickets.push(_react2.default.createElement(
                  'span',
                  null,
                  tickets[j],
                  '  ',
                  tickets[j + k],
                  '  '
                ));
              } else {
                yourTickets.push(_react2.default.createElement(
                  'span',
                  null,
                  '[',
                  tickets[j],
                  ' - ',
                  tickets[j + k - 1],
                  ']  '
                ));
              }
              j += k;
              k = 1;
            }
          }
        }
        return _react2.default.createElement(
          Link,
          { to: '/round/archive/' + round._id, key: i },
          _react2.default.createElement(
            _materialUi.ListItem,
            null,
            _react2.default.createElement(
              'div',
              { className: 'round__history__element row' },
              _react2.default.createElement(
                'div',
                { className: 'round__history__pic col-lg-2' },
                _react2.default.createElement(RoundPic, { tickets: round.tickets })
              ),
              _react2.default.createElement(
                'div',
                { className: 'round__history__description col-lg-10' },
                _react2.default.createElement(
                  'span',
                  null,
                  'ID: ',
                  round._id
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'span',
                  null,
                  'В раунде ',
                  round.tickets.length,
                  ' билетов.'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'span',
                  null,
                  'Ваши билеты: ',
                  yourTickets
                )
              )
            )
          )
        );
      });
      if (this.props.state.roundHistory.length === 0) {
        yourRounds = _react2.default.createElement(_materialUi.ListItem, { primaryText: 'Вы еще не участвовали в розыгрышах' });
      }
      return _react2.default.createElement(
        'div',
        { className: 'round__history__block' },
        _react2.default.createElement(
          'h1',
          { style: { textAlign: 'center', color: 'black' } },
          'Ваши розыгрыши'
        ),
        _react2.default.createElement(
          _materialUi.List,
          null,
          yourRounds
        )
      );
    }
  }]);

  return RoundHistory;
}(_react2.default.Component);