'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pages = function (_React$Component) {
  _inherits(Pages, _React$Component);

  function Pages() {
    _classCallCheck(this, Pages);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pages).apply(this, arguments));
  }

  _createClass(Pages, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'panel-pages' },
        _react2.default.createElement(
          'h1',
          { className: 'text-center' },
          'Редактирование контента'
        ),
        _react2.default.createElement(
          'form',
          { action: '/modify-content', method: 'post' },
          _react2.default.createElement(
            'h2',
            { className: 'text-center' },
            'Верхний блок'
          ),
          _react2.default.createElement('textarea', { rows: '5', cols: '120', name: 'introText', defaultValue: this.context.store.content ? this.context.store.content[0].text : '' }),
          _react2.default.createElement(
            'h2',
            { className: 'text-center' },
            'Нижний блок '
          ),
          _react2.default.createElement('textarea', { rows: '5', cols: '120', name: 'securityText', defaultValue: this.context.store.content ? this.context.store.content[1].text : '' }),
          _react2.default.createElement('input', { type: 'submit', value: 'Изменить', className: 'btn btn-lg btn-primary' }),
          _react2.default.createElement(
            'div',
            { className: 'help' },
            _react2.default.createElement(
              'h3',
              null,
              'Справка'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Внутри тэга <h1> - заголовок.',
              _react2.default.createElement('br', null),
              'Внутри тэга <p> - текст.',
              _react2.default.createElement('br', null),
              'Тэг <br/> - перевод строки.'
            )
          )
        )
      );
    }
  }]);

  return Pages;
}(_react2.default.Component);

exports.default = Pages;