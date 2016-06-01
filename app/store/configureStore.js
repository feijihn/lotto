import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/reducers.js';
import {persistState} from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
  let middleware = applyMiddleware();
  let enhancer;

  if (process.env.NODE_ENV === 'production') {
    enhancer = compose(middleware);
  } else {
    let middlewares = [require('redux-immutable-state-invariant')(), thunkMiddleware];
    middleware = applyMiddleware(...middlewares);

    let getDebugSessionKey = function() {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    enhancer = compose(

      // Middleware we want to use in development
      middleware,
      window.devToolsExtension ?
        window.devToolsExtension() :
        require('../containers/DevTools').default.instrument(),

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  }

  const store = createStore(rootReducer, initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers/reducers.js', () =>
      store.replaceReducer(require('../reducers/reducers.js').default)
    );
  }

  return store;
}
