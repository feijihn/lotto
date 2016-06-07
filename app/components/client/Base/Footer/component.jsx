import React from 'react';
import {Divider} from 'material-ui';

export default class Footer extends React.Component {
  render() {
    return (
      <div className={'footer row'}>
        <div className={'col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 text-center'}>
          <div className={'footerLinks col-lg-6 col-md-6 col-sm-6'}>
            <h3>Lotalot</h3>
            <ul>
              <li><a href="#">О проекте</a></li>
              <li><a href="#">Документы</a></li>
              <li><a href="#">Помощь</a></li>
              <li><a href="#">Блог</a></li>
              <li><a href="#">Регистрация</a></li>
            </ul>
          </div>
          <div className={'footerLinks col-lg-6 col-md-6 col-sm-6'}>
            <h3>Помощь</h3>
            <ul>
              <li><a href="#">Как оплатить</a></li>
              <li><a href="#">О честности</a></li>
              <li><a href="#">Цены</a></li>
              <li><a href="#">Частые вопросы</a></li>
              <li><a href="#">Отзывы</a></li>
            </ul>
          </div>
        </div>
          <div className={'footerEnd'}>
              <span className={'copyright'}>
                © <a href="#">ООО "Лоталот"</a>, 2016
              </span>
              <br/>
              <span className={'supportMail'}>
                <a href="mailto:support@lotalot.io">support@lotalot.io</a>
              </span>
          </div>
      </div>
    );
  }
}
//<div className={'footerLinks col-lg-4'}>
            //<h3>Категории призов</h3>
            //<ul>
              //<li><a href="#">Электроника</a></li>
              //<li><a href="#">Путешествия</a></li>
              //<li><a href="#">Услуги</a></li>
              //<li><a href="#">Для неё</a></li>
              //<li><a href="#">Для него</a></li>
            //</ul>
          //</div>

