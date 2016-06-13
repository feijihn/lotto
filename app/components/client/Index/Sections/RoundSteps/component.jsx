import React from 'react';

export default class RoundSteps extends React.Component {
  render() {
    return (
      <div className={'page__section col-lg-12 col-md-12 hidden-sm hidden-xs section'} id="round__steps">
        <div className={'col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'}>
          <h1 className={'section__title__black text-center'}>Как проходит розыгрыш</h1>
            <div className={'col-lg-4 col-md-4 col-sm-4 text-center'}>
              <img src="../../public/images/giving-tickets.png" alt=""/>
              <p className={'round__steps__caption'}>
                Вы покупаете билеты
              </p>
            </div>
            <div className={'col-lg-4 col-md-4 col-sm-4 text-center'}>
              <img src="../../public/images/stopwatch.png" alt=""/>
              <p className={'round__steps__caption'}>
                Ожидаются bitcoin транзакции на момент конца раунда
              </p>
            </div>
            <div className={'col-lg-4 col-md-4 col-sm-4 text-center'}>
              <img src="../../public/images/trophy.png" alt=""/>
              <p className={'round__steps__caption'}>
                На основе транзакций определяется победитель
              </p>
            </div>
        </div>
      </div>
    );
  }
}
