'use strict';

import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from '../app/reducers/reducers';
import Main from '../app/components/Main';

module.exports = function(req, res) {
  // Create a new Redux store instance
  const store = createStore(App);

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const initialState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState));
};

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="client.bundle.js"></script>
        <script src="vendor.bundle.js"></script>
      </body>
    </html>
    `;
}
