import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

injectTapEventPlugin();

class Main extends React.Component {
  componentWillMount = () => {
    this.props.fetchContent();
  }
  componentDidMount = () => {
    this.props.fetchProducts();
    this.props.fetchRoundsArchive();
    if (window.location.hash === '_=_') {
      window.location.hash = '';
    }
  };
  handleTicketClick = value => {
    this.props.claimTicket(value);
  };
  deselectTicket = value => {
    this.props.deselectTicket(value);
  };
  handleBuyClick = () => {
    this.props.ownTickets(this.props.state.markedTickets, this.props.state.round._id);
    this.props.fetchTickets(this.props.state.round._id);
  }
  handleAlertRead = alertId => {
    this.props.markAlertAsRead(alertId);
  }
  render() {
    return (
      <div className="page-container">
        <Header />
        <div className="body-container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
