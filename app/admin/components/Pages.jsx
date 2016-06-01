import React from 'react';

export default class Pages extends React.Component {
  render() {
    return (
      <div className={'panel-pages'}>
        <h1 className={'text-center'}>Редактирование контента</h1>
        <form action="/modify-content" method="post">
            <h2 className={'text-center'}>Верхний блок</h2>
          <textarea rows="5" cols="120" name="introText" defaultValue={this.context.store.content ? this.context.store.content[0].text : ''} />
            <h2 className={'text-center'}>Нижний блок </h2>
          <textarea rows="5" cols="120" name="securityText" defaultValue={this.context.store.content ? this.context.store.content[1].text : ''} />
          <input type="submit" value="Изменить" className={'btn btn-lg btn-primary'}/>
        </form>
      </div>
    );
  }
}
