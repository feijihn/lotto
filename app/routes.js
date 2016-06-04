import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import Main from './components/client/Main.jsx';
import IndexPage from './components/client/Index/component.jsx';
import RoundPage from './components/client/Round/component.jsx';
import Notifications from './components/client/Notifications/component.jsx';
import Profile from './components/client/Profile/component.jsx';
import AdminMain from './components/admin/Main.jsx';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage} />
    <Route path={'/round/:prodId'} component={RoundPage} />
    <Route path={'/round/archive/:roundId'} componenr={RoundPage} />
    <Route path={'/notifications'} component={Notifications} />
    <Route path={'/profile'} component={Profile} />
    <Route path={'/admin/panel'} component={AdminMain} />
    <Redirect from="*" to="404" />
  </ Route>
);
