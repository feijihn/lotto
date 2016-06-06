import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions.js';

export default class Pages extends React.Component {
  componentWillMount = () => {
    this.props.fetchContent();
  }
  render() {
    return (
      <div className={'admin__panel__content'}>
        <h1 className={'text-center'}>Редактирование контента</h1>
        <form action="/modify-content" method="post">
            <h2 className={'text-center'}>Верхний блок</h2>
          <textarea rows="5" cols="120" name="introText" defaultValue={this.props.state.content ? this.props.state.content[0].text : ''} />
            <h2 className={'text-center'}>Нижний блок </h2>
          <textarea rows="5" cols="120" name="securityText" defaultValue={this.props.state.content ? this.props.state.content[1].text : ''} />
          <input type="submit" value="Изменить" className={'btn btn-lg btn-primary'}/>
          <div className={'help'}>
            <h3>Справка</h3>
            <p>
            Внутри тэга &lt;h1&gt; - заголовок.<br/>
            Внутри тэга &lt;p&gt; - текст.<br/>
            Тэг &lt;br/&gt; - перевод строки.
            </p>
          </div>

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
)(Pages);
