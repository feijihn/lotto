import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import AdminMain from './components/Main.jsx';
import Index from './components/Index.jsx';
import Products from './components/Products.jsx';
import Rounds from './components/Rounds.jsx';
import Pages from './components/Pages.jsx';

export default (
    <Route path="/" component={AdminMain}>
      <IndexRoute component={Index} />
      <Route path="/products" component={Products} />
      <Route path="/rounds" component={Rounds} />
      <Route path="/pages" component={Pages} />
    </Route>
)
