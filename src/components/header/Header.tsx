import React from 'react';
import './Header.scss';

export function Header({ yandexToken }: { yandexToken: string }) {
  return (
    <header className="header">
      {!yandexToken && (
        <button
          className="header__btn-yandex common-button"
          /* onClick={handelbtnYandexClick} */
        ></button>
      )}
    </header>
  );
}
