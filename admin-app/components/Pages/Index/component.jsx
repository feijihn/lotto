import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../../actions/actions.js';

class PagesIndex extends React.Component {
  componentDidMount = () => {
    this.props.fetchContent()
    .then(
      result => this.fillDefaultForms(),
      error => console.error(error)
    )
  }
  fillDefaultForms = () => {
    let form = this.refs.contentForm;
    let content = this.props.state.content;
    form[0].value = content.introSection.header;
    form[1].value = content.introSection.text;
    form[2].value = content.reliabilitySection.header;
    form[3].value = content.reliabilitySection.text;
  }
  handleSubmit = () => {
    let form = this.refs.contentForm;
    let formData = {
      introSection: {
        header: form[0].value,
        text: form[1].value
      },
      reliabilitySection: {
        header: form[2].value,
        text: form[3].value
      }

    }
    this.props.submitContent(formData);
  }
  render() {
    return (
      <div className={'admin-panel__content'}>
        <form action="javascript:void(0)" onSubmit={this.handleSubmit} ref="contentForm">
            <h2 className={'text-center'}>Верхний блок</h2>
            <h3>Header</h3>
            <input
              type="text"
              className={'form-control'}
              name="introHeader"
            />
            <h3>Text</h3>
            <textarea
              className={'form-control'}
              rows="5"
              cols="110"
              name="introText"
            />
            <h2 className={'text-center'}>Нижний блок </h2>
            <h3>Header</h3>
            <input
              type="text"
              className={'form-control'}
              name="reliablitityHeader"
            />
            <h3>Text</h3>
            <textarea
              className={'form-control'}
              rows="5"
              cols="110"
              name="reliabilityText"
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
