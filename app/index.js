import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Router, hashHistory} from 'react-router';

import routes from './routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore();
const rootElement = document.getElementById('container');
let ComponentEl;

if (process.env.NODE_ENV === 'development') {
  const DevTools = require('./containers/DevTools').default;
  // If using routes
  ComponentEl = (
    <div>
      <Router history={hashHistory} routes={routes} useAutoKey={true}/>
      <DevTools />
    </div>
  );
} else {
  ComponentEl = (
    <div>
      <Router history={hashHistory} routes={routes} useAutoKey={true}/>
    </div>
  );
}

ReactDOM.render(
  <Provider store={store}>
    {ComponentEl}
  </Provider>,
  rootElement
);
