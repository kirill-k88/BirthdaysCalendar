import './App.scss';
import { useLayoutEffect, useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { createNewDate, getEndOfYear, getStartOfYear } from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { myDateType } from '../../utils/dateType';
import { authorize, createGapi, getLEventList } from '../../utils/googleApi';

export function App() {
  const myDate: myDateType = createNewDate(new Date());
  const [curentDate, setCurentDate] = useState(myDate);
  const [eventList, setEventList] = useState<any>([]);
  const [isAuthtorized, setIsAuthtorized] = useState(false);

  useLayoutEffect(() => {
    createGapi();
  }, []);

  useEffect(() => {
    if (isAuthtorized) {
      getLEventList(getStartOfYear(myDate.date), getEndOfYear(myDate.date), setEventList);
    }
  }, [isAuthtorized]);

  function handleAuthBtn() {
    authorize(setIsAuthtorized);
  }

  return (
    <CurrentDateContext.Provider value={{ curentDate }}>
      <div className="app">
        <Header
          handleAuthBtn={handleAuthBtn}
          isAuthtorized={isAuthtorized}
        />
        <Month
          setCurentDate={setCurentDate}
          eventList={eventList}
          isAuthtorized={isAuthtorized}
        />
        <Footer />
      </div>
    </CurrentDateContext.Provider>
  );
}
