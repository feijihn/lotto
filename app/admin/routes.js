import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import AdminMain from './components/Main.jsx';
import Index from './components/Index.jsx';
import Products from './components/Products.jsx';
import Rounds from './components/Rounds.jsx';
import Pages from './components/Pages.jsx';

export default (
    <Route path="/admin-panel" component={AdminMain}>
      <IndexRoute component={Index} />
      <Route path="/admin-panel/products" component={Products} />
      <Route path="/admin-panel/rounds" component={Rounds} />
      <Route path="/admin-panel/pages" component={Pages} />
    </Route>
)
