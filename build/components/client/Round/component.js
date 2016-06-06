'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../../../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

var _component = require('./RoundCheck/component.jsx');

var _component2 = _interopRequireDefault(_component);

var _component3 = require('./RoundInfo/component.jsx');

var _component4 = _interopRequireDefault(_component3);

var _component5 = require('./RoundLegend/component.jsx');

var _component6 = _interopRequireDefault(_component5);

var _component7 = require('./Ticket/component.jsx');

var _component8 = _interopRequireDefault(_component7);

var _materialUi = require('material-ui');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoundPage = function (_React$Component) {
  _inherits(RoundPage, _React$Component);

  function RoundPage(props) {
    _classCallCheck(this, RoundPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoundPage).call(this, props));

    _this.handleClose = function () {
      _this.setState({
        open: false
      });
    };

    _this.componentWillMount = function () {
      if (_this.props.prodId) {
        _this.props.fetchProducts();
        _this.props.fetchRounds(_this.props.prodId);
        var handle = setInterval(function () {
          _this.props.fetchTickets(_this.props.state.round._id);
        }, 5000);
        _this.setState({
          fetchTicketsHandle: handle
        });
      } else if (_this.props.roundId) {
        _this.props.fetchRoundById(_this.props.roundId);
        var _handle = setInterval(function () {
          _this.props.fetchTickets(_this.props.roundId);
        }, 5000);
        _this.setState({
          fetchTicketsHandle: _handle
        });
      }
    };

    _this.componentWillUnmount = function () {
      clearInterval(_this.state.fetchTicketsHandle);
      _this.props.clearTickets();
    };

    _this.state = {
      open: true
    };
    window.scrollTo(0, 100);
    return _this;
  }

  _createClass(RoundPage, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tickets = this.props.state.viewingTickets.map(function (value, i) {
        if (i === _this2.props.state.winner) {
          return _react2.default.createElement(_component8.default, {
            lg: 2,
            md: 1,
            sm: 1,
            bgImage: '../../public/images/ballAmber.png',
            id: i,
            key: i
          });
        }
        if (value === 0) {
          return _react2.default.createElement(
            _component8.default,
            {
              lg: 1,
              md: 2,
              sm: 3,
              bgImage: '../../public/images/ballBlue.png',
              id: i,
              key: i,
              handleClick: function handleClick(value) {
                return _this2.props.claimTicket(value);
              }
            },
            _react2.default.createElement(
              'span',
              null,
              i
            )
          );
        }
        if (value === 1) {
          return _react2.default.createElement(
            _component8.default,
            {
              lg: 1,
              md: 2,
              sm: 3,
              bgImage: '../../public/images/ballRed.png',
              id: i,
              key: i
            },
            _react2.default.createElement(
              'span',
              null,
              i
            )
          );
        }
        if (value === 2) {
          return _react2.default.createElement(
            _component8.default,
            {
              lg: 1,
              md: 2,
              sm: 3,
              bgImage: '../../public/images/ballGreen.png',
              id: i,
              key: i
            },
            _react2.default.createElement(
              'span',
              null,
              i
            )
          );
        }
        if (value === 3) {
          return _react2.default.createElement(
            _component8.default,
            {
              lg: 2,
              md: 1,
              sm: 1,
              bgImage: '../../public/images/ballPurple.png',
              id: i,
              key: i,
              handleClick: function handleClick(value) {
                return _this2.props.deselectTicket(value);
              }
            },
            _react2.default.createElement(
              'span',
              null,
              i
            )
          );
        }
        return undefined;
      });
      var roundPage = void 0;
      if (this.props.state.roundWaitingForWinner) {
        roundPage = _react2.default.createElement(
          'div',
          { className: 'roundPage row' },
          _react2.default.createElement(
            'div',
            { className: 'roundContainer col-lg-10 col-lg-offset-1' },
            _react2.default.createElement(_component6.default, null),
            _react2.default.createElement(
              'div',
              { className: 'ticketContainer col-lg-6' },
              tickets,
              _react2.default.createElement('div', { className: 'roundWaiting' }),
              _react2.default.createElement(
                'h1',
                null,
                'Выбираем победителя...'
              )
            ),
            _react2.default.createElement(_component2.default, null)
          )
        );
      } else if (this.props.state.roundFinished) {
        roundPage = _react2.default.createElement(
          'div',
          { className: 'roundPage row' },
          _react2.default.createElement(
            'div',
            { className: 'roundContainer col-lg-10 col-lg-offset-1' },
            _react2.default.createElement(_component6.default, null),
            _react2.default.createElement(
              'div',
              { className: 'ticketContainer col-lg-6 roundFinished' },
              tickets,
              _react2.default.createElement('div', { className: 'roundWaiting' }),
              _react2.default.createElement(
                'h1',
                null,
                'Раунд завершен! Выйграл билет №',
                this.props.state.winner
              )
            ),
            _react2.default.createElement(_component2.default, null)
          )
        );
      } else {
        roundPage = _react2.default.createElement(
          'div',
          { className: 'roundPage row' },
          _react2.default.createElement(
            'div',
            { className: 'roundContainer col-lg-10 col-lg-offset-1' },
            _react2.default.createElement(_component6.default, null),
            _react2.default.createElement(
              'div',
              { className: 'ticketContainer col-lg-6' },
              tickets
            ),
            _react2.default.createElement(_component2.default, null)
          )
        );
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_component4.default, { prodId: this.props.prodId }),
        roundPage
      );
    }
  }]);

  return RoundPage;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoundPage);