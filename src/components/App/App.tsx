import React, { useLayoutEffect, useState } from 'react';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { createNewDate } from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { dateType } from '../../utils/dateType';
import { getParameterByName } from '../../utils/urlFunctions';
import { getYandexUserInfo, getOAuthTokenLink } from '../../utils/yandexApi';

export function App() {
  const myDate: dateType = createNewDate(new Date());
  const [curentDate, setCurentDate] = useState(myDate);
  const [userData, setUserData] = useState({});
  const [yandexToken, setYandexToken] = useState('');

  function handelbtnYandexClick(): void {
    //переход на страницу Oauth Яндекса,для получения токена
    window.location.href = getOAuthTokenLink(window.location.pathname);
  }

  useLayoutEffect(() => {
    //после перенаправления со страницы получения Яндекс oauth-токена необходимо его получить из параметров url
    let token = '';
    if (getParameterByName('#access_token')) {
      token = getParameterByName('#access_token');
      localStorage.setItem('oauthToken', token);
    } else {
      if (localStorage.getItem('oauthToken')) {
        token = localStorage.getItem('oauthToken') || '';
      }
    }

    if (token) {
      setYandexToken(token);
      //получаем данные пользователя
      getYandexUserInfo(token)
        .then(data => {
          setUserData(data);
          console.log(data);
        })
        .catch(err => {
          console.log('Ошибка запроса: ' + err);
          localStorage.setItem('oauthToken', '');
        });
    } else {
      //пробуем получить токен по новой
      window.location.href = getOAuthTokenLink(window.location.pathname);
    }
  }, []);

  return (
    <CurrentDateContext.Provider value={{ curentDate }}>
      <div className="app">
        <Header yandexToken={yandexToken} />
        <Month setCurentDate={setCurentDate} />
        <Footer />
      </div>
    </CurrentDateContext.Provider>
  );
}
