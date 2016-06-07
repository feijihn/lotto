import React from 'react';

export default class InteractiveCheck extends React.Component {
  render() {
    return(
      <div className={'about-mechanics__interactive-check'}>
        <div className={'about-mechanics__check-fields'}>
          <h3>Выберите дату и время</h3>
          <input type={'datetime'} className={'form-control field'} />
          <h3>Или введите id раунда для проверки</h3>
          <input type={'text'} className={'form-control field'} />
        </div>
        <button className={'btn btn-lg btn-info'}>Проверить</button>
      </div>
    );
  }
}
