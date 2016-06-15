import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import AdminMain from './components/Main.jsx';
import Index from './components/Index.jsx';
import Products from './components/Products.jsx';
import Rounds from './components/Rounds.jsx';
import PagesIndex from './components/Pages/Index/component.jsx';
import PagesFooter from './components/Pages/Footer/component.jsx';

export default (
    <Route path="/" component={AdminMain}>
      <IndexRoute component={Index} />
      <Route path="/products" component={Products} />
      <Route path="/rounds" component={Rounds} />
      <Route path="/pages/index" component={PagesIndex} />
      <Route path="/pages/footer" component={PagesFooter} />
    </Route>
)
