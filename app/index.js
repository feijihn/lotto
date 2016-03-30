import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';  
import { createStore, applyMiddleware } from 'redux';
import App from './reducers/reducers.js';
import Main from './components/Main.jsx';
import AppContainer from './container.jsx';

let store = createStore(
  App,
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('container')
);

