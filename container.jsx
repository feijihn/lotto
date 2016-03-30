import {connect} from 'react-redux';
import App from './';

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default const AppContainer = connect(
  mapStateToProps
)(App)