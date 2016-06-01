import React from 'react';
import Index from './Index.jsx';
import Products from './Products.jsx';
import Rounds from './Rounds.jsx';
import Pages from './Pages.jsx';
import {Location, Locations} from 'react-router-component';

export default class Router extends React.Component {
  render() {
    return (
    <Locations hash className={'panelRouterContainer'}>
      <Location path="/" handler={<Index />} />
      <Location path="/panel-products" handler={<Products />} />
      <Location path="/panel-rounds" handler={<Rounds />} />
      <Location path="/panel-pages" handler={<Pages />} />
    </Locations>
    );
  }
}
