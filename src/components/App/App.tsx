import { useLayoutEffect, useState } from 'react';
import './App.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { createNewDate, getEndOfYear, getStartOfYear } from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { dateType } from '../../utils/dateType';
import { authorize, createGapi, listOfEvents } from '../../utils/googleApi';

export function App() {
  const myDate: dateType = createNewDate(new Date());
  const [curentDate, setCurentDate] = useState(myDate);
  const [userData, setUserData] = useState({});
  const [isAuthtorized, setIsAuthtorized] = useState(false);

  useLayoutEffect(() => {
    createGapi();
  }, []);

  useLayoutEffect(() => {
    if (isAuthtorized) {
      listOfEvents(getStartOfYear(myDate.date), getEndOfYear(myDate.date));
    }
  }, [isAuthtorized]);

  function handleAuthBtn() {
    authorize(setIsAuthtorized);
  }

  return (
    <CurrentDateContext.Provider value={{ curentDate }}>
      <div className="app">
        <Header handleAuthBtn={handleAuthBtn} isAuthtorized={isAuthtorized} />
        <Month setCurentDate={setCurentDate} />
        <Footer />
      </div>
    </CurrentDateContext.Provider>
  );
}
