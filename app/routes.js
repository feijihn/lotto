import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import Main from './components/client/Main.jsx';
import IndexPage from './components/client/Index/component.jsx';
import RoundPage from './components/client/Round/component.jsx';
import Notifications from './components/client/Notifications/component.jsx';
import Profile from './components/client/Profile/component.jsx';
import AboutMechanics from './components/client/AboutMechanics/component.jsx';
import Document from './components/client/Document/component.jsx';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage} />
    <Route path={'/_=_'} component={IndexPage} />
    <Route path={'/round/:productId'} component={RoundPage} />
    <Route path={'/round/archive/:roundId'} component={RoundPage} />
    <Route path={'/notifications'} component={Notifications} />
    <Route path={'/profile'} component={Profile} />
    <Route path={'/mechanics'} component={AboutMechanics} />
    <Route path={'/document/:documentName'} component={Document} />
    <Redirect from="*" to="404" />
  </ Route>
);
