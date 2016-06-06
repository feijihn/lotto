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

var _actions = require('../../../../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoundCheck = function (_React$Component) {
  _inherits(RoundCheck, _React$Component);

  function RoundCheck(props) {
    _classCallCheck(this, RoundCheck);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoundCheck).call(this, props));

    _this.handleBuyClick = function () {
      if (_this.props.state.loggedIn) {
        _this.props.ownTickets(_this.props.state.markedTickets, _this.props.state.round._id);
        _this.props.fetchTickets(_this.props.state.round._id);
      } else {
        _this.setState({
          open: true
        });
      }
    };

    _this.togglePaymentForm = function () {
      _this.setState({
        paymentFormOpened: !_this.state.paymentFormOpened
      });
    };

    _this.handleRequestClose = function () {
      _this.setState({
        open: false
      });
    };

    _this.state = {
      open: false,
      paymentFormOpened: false
    };
    return _this;
  }

  _createClass(RoundCheck, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var paymentActions = [_react2.default.createElement(_materialUi.FlatButton, {
        label: 'Закрыть',
        primary: true,
        onTouchTap: this.togglePaymentForm
      })];
      return _react2.default.createElement(
        'div',
        { className: 'roundCheque col-lg-3 col-md-2 hidden-sm' },
        _react2.default.createElement(
          'h1',
          null,
          'Вы выбрали ',
          _react2.default.createElement('br', null),
          ' ',
          _react2.default.createElement(
            'span',
            null,
            ' ',
            this.props.state.markedTickets.length
          ),
          ' ',
          _react2.default.createElement('br', null),
          ' билетов ',
          _react2.default.createElement('br', null)
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-lg btn-primary text-center buyButton',
            onClick: function onClick() {
              _this2.handleBuyClick();
              _this2.togglePaymentForm();
            }
          },
          _react2.default.createElement(
            'span',
            null,
            'Купить'
          ),
          _react2.default.createElement('br', null)
        ),
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-lg btn-danger selectAllButton',
            onClick: this.props.selectAllTickets
          },
          _react2.default.createElement(
            'span',
            null,
            'Выделить все'
          )
        ),
        _react2.default.createElement(_materialUi.Snackbar, {
          className: 'snackbar',
          open: this.state.open,
          message: 'Для покупки билетов войдите или зарегистрируйтесь',
          autoHideDuration: 4000,
          onRequestClose: this.handleRequestClose
        }),
        _react2.default.createElement(
          _materialUi.Dialog,
          {
            title: 'Оплата',
            actions: paymentActions,
            open: this.state.paymentFormOpened && this.props.state.loggedIn,
            bodyStyle: {
              maxHeight: 'auto'
            }
          },
          _react2.default.createElement(HorizontalLinearStepper, null)
        )
      );
    }
  }]);

  return RoundCheck;
}(_react2.default.Component);

exports.default = RoundCheck;

var HorizontalLinearStepper = function (_React$Component2) {
  _inherits(HorizontalLinearStepper, _React$Component2);

  function HorizontalLinearStepper() {
    var _Object$getPrototypeO;

    var _temp, _this3, _ret;

    _classCallCheck(this, HorizontalLinearStepper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HorizontalLinearStepper)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this3), _this3.state = {
      finished: false,
      stepIndex: 0
    }, _this3.handleNext = function () {
      var stepIndex = _this3.state.stepIndex;

      _this3.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      });
    }, _this3.handlePrev = function () {
      var stepIndex = _this3.state.stepIndex;

      if (stepIndex > 0) {
        _this3.setState({ stepIndex: stepIndex - 1 });
      }
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(HorizontalLinearStepper, [{
    key: 'getStepContent',
    value: function getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return '';
        case 1:
          return '';
        case 2:
          return '';
        default:
          return '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var finished = _state.finished;
      var stepIndex = _state.stepIndex;

      var contentStyle = { margin: '0 16px' };

      return _react2.default.createElement(
        'div',
        { style: { width: '100%', maxWidth: 700, margin: 'auto' } },
        _react2.default.createElement(
          _materialUi.Stepper,
          { activeStep: stepIndex },
          _react2.default.createElement(
            _materialUi.Step,
            null,
            _react2.default.createElement(
              _materialUi.StepLabel,
              null,
              'Подтвердите покупку'
            )
          ),
          _react2.default.createElement(
            _materialUi.Step,
            null,
            _react2.default.createElement(
              _materialUi.StepLabel,
              null,
              'Введите платежную информацию'
            )
          ),
          _react2.default.createElement(
            _materialUi.Step,
            null,
            _react2.default.createElement(
              _materialUi.StepLabel,
              null,
              'Подтверждение от банка'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: contentStyle },
          finished ? _react2.default.createElement(
            'p',
            null,
            'Done!'
          ) : _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              null,
              this.getStepContent(stepIndex)
            ),
            _react2.default.createElement(
              'div',
              { style: { marginTop: 12 } },
              _react2.default.createElement(_materialUi.FlatButton, {
                label: 'Back',
                disabled: stepIndex === 0,
                onTouchTap: this.handlePrev,
                style: { marginRight: 12 }
              }),
              _react2.default.createElement(_materialUi.RaisedButton, {
                label: stepIndex === 2 ? 'Finish' : 'Next',
                primary: true,
                onTouchTap: this.handleNext
              })
            )
          )
        )
      );
    }
  }]);

  return HorizontalLinearStepper;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RoundCheck);