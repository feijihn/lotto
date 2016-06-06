'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reducers = require('../reducers/reducers.js');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxDevtools = require('redux-devtools');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState) {
  var middlewares = [require('redux-immutable-state-invariant')(), _reduxThunk2.default];
  var middleware = _redux.applyMiddleware.apply(undefined, middlewares);
  var enhancer = void 0;

  if (process.env.NODE_ENV === 'development') {
    var getDebugSessionKey = function getDebugSessionKey() {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      var matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return matches && matches.length ? matches[1] : null;
    };

    enhancer = (0, _redux.compose)(

    // Middleware we want to use in development
    middleware, window.devToolsExtension ? window.devToolsExtension() : require('../containers/DevTools').default.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    (0, _reduxDevtools.persistState)(getDebugSessionKey()));
  } else {
    enhancer = (0, _redux.compose)(middleware);
  }

  var store = (0, _redux.createStore)(_reducers2.default, initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers/reducers.js', function () {
      return store.replaceReducer(require('../reducers/reducers.js').default);
    });
  }

  return store;
}