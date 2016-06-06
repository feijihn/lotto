'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntroSection = function (_React$Component) {
  _inherits(IntroSection, _React$Component);

  function IntroSection() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, IntroSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IntroSection)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.scrollToRounds = function () {
      document.getElementById('rounds').scrollIntoView();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(IntroSection, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'introSection row' },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-10 col-lg-offset-1 text-center introContent' },
          _react2.default.createElement('div', { className: 'introCaption caption', dangerouslySetInnerHTML: { __html: this.props.state.introText } }),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-lg btn-info', onClick: this.scrollToRounds },
            _react2.default.createElement(
              'a',
              { href: '#', id: 'playButton' },
              'Играть'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { className: 'introTrust' },
            _react2.default.createElement(
              'span',
              { className: 'handsIcon' },
              _react2.default.createElement('img', { src: '../../public/images/hands.png', width: '32px', height: '32px' }),
              'Честно и надежно'
            ),
            _react2.default.createElement(
              'span',
              { className: 'moreIcon' },
              _react2.default.createElement('img', { src: '../../public/images/more.png', width: '32px', height: '32px' }),
              _react2.default.createElement(
                'a',
                { href: '#' },
                ' прочитайте подробнее'
              )
            )
          )
        )
      );
    }
  }]);

  return IntroSection;
}(_react2.default.Component);
/* <h1>Добро пожаловать в Lotalot! <span className={'label label-default'}>Alpha</span></h1>
<p>Кристально чистые и прозрачные розыгрыши всяких клёвых штук.<br/>
  Покупайте билеты и выигрывайте призы! Покупайте больше если не выйграли,<br/>
  если выйграли покупайте еще больше. Мы вам очень рады а еще больше будем рады,<br/>
  если вы купите билетов, так что покупайте поскорей! Выйграйте айфон и понтуйтесь<br/>
  перед друзьями в школе, выйграйте макбук и понтуйтесь перед друзьями в старбаксе!<br/>
  миллион возможностей только для вас! Спешите! Призы ограничены!
</p>*/

function mapStateToProps(state) {
  return {
    state: state
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntroSection);