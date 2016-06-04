import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import {Router, browserHistory} from 'react-router';

import routes from './routes.js';

const store = configureStore();
const rootElement = document.getElementById('container');
let ComponentEl;

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./containers/DevTools').default;
  // If using routes
  ComponentEl = (
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  );
} else {
  ComponentEl = (
    <div>
      <Router history={browserHistory} routes={routes} />
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    {ComponentEl}
  </Provider>,
  rootElement
);

