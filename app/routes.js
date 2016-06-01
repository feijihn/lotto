import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import Main from './components/Main.jsx';
import IndexPage from './components/Index.jsx';
import RoundPage from './components/RoundPage.jsx';
import AlertsPage from './components/AlertsPage.jsx';
import Profile from './components/Profile.jsx';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage} />
    <Route path={'/round/:prodId'} component={RoundPage} />
    <Route path={'/round/archive/:roundId'} componenr={RoundPage} />
    <Route path={'/alerts'} component={AlertsPage} />
    <Route path={'/profile'} component={Profile} />
    <Redirect from="*" to="404" />
  </ Route>
);
