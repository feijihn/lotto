import React from 'react';

import Header from './Base/Header/component.jsx';
import Footer from './Base/Footer/component.jsx';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/actions.js';

const muiTheme = getMuiTheme();

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Main extends React.Component {
  getChildContext = () => {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }
  componentWillMount = () => {
    this.props.fetchContent();
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className="page-container">
        <div className="body-container">
        <Header params={this.props.params}/>
          {this.props.children}
        <Footer />
        </div>
      </div>
    );
  }
}
Main.childContextTypes = {
  muiTheme: React.PropTypes.object
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
