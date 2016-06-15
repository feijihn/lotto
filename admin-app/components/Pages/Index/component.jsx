import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions.js';

class PagesIndex extends React.Component {
  componentWillMount = () => {
    this.props.fetchContent();
  }
  componentDidMount = () => {
    this.props.fetchContent();
  }
  handleSubmit = () => {
    let form = this.refs.contentForm;
    let formData = {
      introHeader: form[0].value,
      introText: form[1].value,
      reliabilityHeader: form[2].value,
      reliabilityText: form[3].value
    }
    this.props.submitContent(formData);
  }
  render() {
    let content = this.props.state.content;
    return (
      <div className={'admin-panel__content'}>
        <form action="javascript:void(0)" onSubmit={this.handleSubmit} ref="contentForm">
            <h2 className={'text-center'}>Верхний блок</h2>
            <h3>Header</h3>
            <input
              type="text"
              className={'form-control'}
              name="introHeader"
              value={content ? content.introSection.header : ''}
            />
            <h3>Text</h3>
            <textarea
              className={'form-control'}
              rows="5"
              cols="110"
              name="introText"
              value={content ? content.introSection.text : ''} 
            />
            <h2 className={'text-center'}>Нижний блок </h2>
            <h3>Header</h3>
            <input
              type="text"
              className={'form-control'}
              name="reliablitityHeader"
              value={content ? content.reliabilitySection.header : ''}
            />
            <h3>Text</h3>
            <textarea
              className={'form-control'}
              rows="5"
              cols="110"
              name="reliabilityText"
              value={content ? content.reliabilitySection.text : ''} 
            />
            <hr/>
            <input
              type="submit"
              value="Изменить"
              className={'btn btn-lg btn-primary'} disabled={this.props.state.contentLoading}
            />
            <img
              src="../../../public/images/ajax-loader.gif"
              style={this.props.state.contentLoading ? {display: 'block'} : {display: 'none'}}
            />
        </form>
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
)(PagesIndex);
