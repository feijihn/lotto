'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutUs = function (_React$Component) {
  _inherits(AboutUs, _React$Component);

  function AboutUs() {
    _classCallCheck(this, AboutUs);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AboutUs).apply(this, arguments));
  }

  _createClass(AboutUs, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'aboutUsSection row' },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-11 col-lg-offset-1 aboutUsContent' },
          _react2.default.createElement('div', { className: 'aboutUsCaption caption', dangerouslySetInnerHTML: { __html: this.props.state.securityText } }),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-primary btn-lg securityButton' },
            _react2.default.createElement(
              'a',
              { href: '#' },
              'Подробнее'
            )
          ),
          _react2.default.createElement('img', { src: '../../public/images/flatlock.png' })
        )
      );
    }
  }]);

  return AboutUs;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(AboutUs);