import React from 'react';
import {Divider} from 'material-ui';

require('./style.scss');

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className={'footer-links__wrapper col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 text-center'}>
          <div className={'footer-links col-lg-6 col-md-6 col-sm-6'}>
            <h3 className={'footer-links__header'}>Lotalot</h3>
            <ul className={'footer-links__list'}>
              <li><a href="#" className={'footer-list__link'}>О проекте</a></li>
              <li><a href="#" className={'footer-list__link'}>Документы</a></li>
              <li><a href="#" className={'footer-list__link'}>Помощь</a></li>
              <li><a href="#" className={'footer-list__link'}>Блог</a></li>
              <li><a href="#" className={'footer-list__link'}>Регистрация</a></li>
            </ul>
          </div>
          <div className={'footer-links col-lg-6 col-md-6 col-sm-6'}>
            <h3 className={'footer-links__header'}>Помощь</h3>
            <ul className={'footer-links__list'}>
              <li><a href="#" className={'footer-list__link'}>Как оплатить</a></li>
              <li><a href="#" className={'footer-list__link'}>О честности</a></li>
              <li><a href="#" className={'footer-list__link'}>Цены</a></li>
              <li><a href="#" className={'footer-list__link'}>Частые вопросы</a></li>
              <li><a href="#" className={'footer-list__link'}>Отзывы</a></li>
            </ul>
          </div>
        </div>
          <div className={'footer-bottom'}>
              <span className={'footer-bottom__copyright'}>
                © <a href="#" className={'footer-list__copyright-link'}>ООО "Лоталот"</a>, 2016
              </span>
              <br/>
              <span className={'footer-bottom__support-mail'}>
                <a href="mailto:support@lotalot.io">support@lotalot.io</a>
              </span>
          </div>
      </footer>
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

