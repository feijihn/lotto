'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('../../../../actions/actions.js');

var Actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));

    _this.componentWillMount = function () {
      _this.props.fetchUserInfo();
    };

    _this.toggleLoginDropdown = function () {
      _this.setState({
        loginDropdownOpen: !_this.state.loginDropdownOpen
      });
    };

    _this.openSignupForm = function () {
      _this.setState({
        signupFormOpened: !_this.state.signupFormOpened
      });
    };

    _this.toggleAvatarDropdown = function () {
      _this.setState({
        avatarDropdownOpen: !_this.state.avatarDropdownOpen
      });
    };

    _this.state = {
      signupFormOpened: false,
      avatarDropdownOpen: false,
      loginDropdownOpen: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var content = _react2.default.createElement('div', null);
      switch (this.props.state.loggedIn) {
        case true:
          if (this.state.avatarDropdownOpen) {
            return _react2.default.createElement(
              'div',
              { className: window.location.pathname === '/' ? 'headBar' : 'headBar sticky' },
              _react2.default.createElement(
                'a',
                { href: '/', className: 'logo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'lotalot'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'headAvatar' },
                _react2.default.createElement(
                  _materialUi.Avatar,
                  { style: {
                      background: 'transparent',
                      border: '3px solid',
                      boxSizing: 'content-box'
                    } },
                  this.props.state.userinfo.local.username.substr(0, 1)
                ),
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-down headAvatarChevron', onClick: this.toggleAvatarDropdown })
              ),
              _react2.default.createElement(
                'div',
                { className: 'avatarDropdown' },
                _react2.default.createElement(
                  'ul',
                  { className: 'dropdown-menu' },
                  _react2.default.createElement(
                    'li',
                    { className: 'dropdown-header' },
                    this.props.state.userinfo.local.username
                  ),
                  _react2.default.createElement('li', { className: 'divider' }),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/profile' },
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement('span', { className: 'glyphicon glyphicon-user' }),
                      ' Профиль'
                    )
                  ),
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/notifications' },
                    _react2.default.createElement(
                      'li',
                      null,
                      _react2.default.createElement('span', { className: 'glyphicon glyphicon-bell' }),
                      ' Уведомления'
                    )
                  ),
                  _react2.default.createElement('li', { className: 'divider' }),
                  _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                      'a',
                      { href: '/logout' },
                      _react2.default.createElement('span', { className: 'glyphicon glyphicon-log-out' }),
                      ' Выйти'
                    )
                  )
                )
              )
            );
          } else {
            return _react2.default.createElement(
              'div',
              { className: window.location.pathname === '/' ? 'headBar' : 'headBar sticky' },
              _react2.default.createElement(
                'a',
                { href: '/', className: 'logo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'lotalot'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'headAvatar' },
                _react2.default.createElement(
                  _materialUi.Avatar,
                  { style: {
                      background: 'transparent',
                      border: '3px solid',
                      boxSizing: 'content-box'
                    } },
                  this.props.state.userinfo.local.username.substr(0, 1)
                ),
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-chevron-down headAvatarChevron', onClick: this.toggleAvatarDropdown })
              )
            );
          }
        case false:
          if (this.state.loginDropdownOpen) {
            var signUpActions = [_react2.default.createElement(_materialUi.FlatButton, {
              label: 'Закрыть',
              primary: true,
              onTouchTap: this.openSignupForm
            })];
            return _react2.default.createElement(
              'div',
              { className: window.location.pathname === '/' ? 'headBar' : 'headBar sticky' },
              _react2.default.createElement(
                'a',
                { href: '/', className: 'logo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'lotalot'
                )
              ),
              _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-primary loginButton',
                  onClick: this.toggleLoginDropdown
                },
                _react2.default.createElement(
                  'span',
                  null,
                  'Войти '
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'signInDropdown' },
                _react2.default.createElement(
                  'ul',
                  { className: 'dropdown-menu' },
                  _react2.default.createElement(
                    'form',
                    { action: '/login', method: 'post', className: 'signInForm' },
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        null,
                        'Email '
                      ),
                      _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'username' }),
                      _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'form-group' },
                      _react2.default.createElement(
                        'label',
                        null,
                        'Пароль '
                      ),
                      _react2.default.createElement('input', { className: 'form-control', type: 'password', name: 'password' }),
                      _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-lg text-center btn-success', type: 'submit' },
                      'Войти'
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '/auth/facebook/' },
                      _react2.default.createElement('img', { src: '../../public/images/Facebook-48.png' })
                    ),
                    _react2.default.createElement(
                      'a',
                      { href: '/auth/vkontakte/' },
                      _react2.default.createElement('img', { src: '../../public/images/Vk.com-48.png' })
                    ),
                    _react2.default.createElement('li', { className: 'divider' }),
                    _react2.default.createElement(
                      'span',
                      null,
                      'Еще нет аккаунта? ',
                      _react2.default.createElement(
                        'a',
                        { onClick: this.openSignupForm, href: '#' },
                        'Регистрация'
                      )
                    )
                  )
                )
              ),
              _react2.default.createElement(
                _materialUi.Dialog,
                {
                  title: 'Регистрация',
                  actions: signUpActions,
                  open: this.state.signupFormOpened,
                  bodyStyle: {
                    maxHeight: 'auto'
                  }
                },
                _react2.default.createElement(
                  'form',
                  { action: '/signup', method: 'post' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      null,
                      'Логин '
                    ),
                    _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'username' }),
                    _react2.default.createElement('br', null)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      null,
                      'Email '
                    ),
                    _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'email' }),
                    _react2.default.createElement('br', null)
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      null,
                      'Пароль '
                    ),
                    _react2.default.createElement('input', { className: 'form-control', type: 'password', name: 'password' }),
                    _react2.default.createElement('br', null)
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-lg text-center btn-success', type: 'submit' },
                    'Зарегистрироваться'
                  )
                )
              )
            );
          } else {
            return _react2.default.createElement(
              'div',
              { className: window.location.pathname === '/' ? 'headBar' : 'headBar sticky' },
              _react2.default.createElement(
                'a',
                { href: '/', className: 'logo' },
                _react2.default.createElement(
                  'h1',
                  null,
                  'lotalot'
                )
              ),
              _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-default loginButton',
                  onClick: this.toggleLoginDropdown
                },
                _react2.default.createElement(
                  'span',
                  null,
                  'Войти '
                )
              )
            );
          }
        default:
          return false;
      }
    }
  }]);

  return Header;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(Actions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);