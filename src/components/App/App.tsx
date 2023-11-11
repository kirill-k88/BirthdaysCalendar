import React, { useState } from 'react';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { createNewDate } from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { dateType } from '../../utils/dateType';

export function App() {
  const myDate: dateType = createNewDate(new Date());
  const [curentDate, setCurentDate] = useState(myDate);

  return (
    <CurrentDateContext.Provider value={{ curentDate }}>
      <div className="app">
        <Header />
        <Month setCurentDate={setCurentDate} />
        <Footer />
      </div>
    </CurrentDateContext.Provider>
  );
}
