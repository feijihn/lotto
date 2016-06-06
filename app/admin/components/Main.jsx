import React from 'react';

import AdminMenu from './Menu.jsx';

import {connect} from 'react-redux';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class AdminMain extends React.Component {
  getChildContext = () => {
    return {
      muiTheme: getMuiTheme(baseTheme),
    };
  }
  render() {
    return (
      <div className={'admin__panel__wrapper'}>
        <AdminMenu />
        <div className="body-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AdminMain.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
    mapStateToProps
)(AdminMain);
