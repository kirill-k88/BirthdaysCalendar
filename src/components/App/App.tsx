import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { createNewDate, getEndOfYear, getStartOfYear } from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { myDateType } from '../../utils/dateType';
import { AddBirthdayPopupForm } from '../AddBirthdayPopupForm/AddBirthdayPopupForm';
import { getEventList } from '../../utils/Api/apiRestDbIo';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { INIT_EVENT_LIST } from '../../utils/constants';

export function App() {
  const myDate: myDateType = createNewDate(new Date());
  const [curentDate, setCurentDate] = useState(myDate);
  const [eventList, setEventList] = useState<Array<IEvent>>(INIT_EVENT_LIST);
  const [isAuthtorized, setIsAuthtorized] = useState(true);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>(INIT_EVENT_LIST[0]);

  useEffect(() => {
    (async () => {
      if (isAuthtorized) {
        try {
          setEventList((await getEventList()) as IEvent[]);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [isAuthtorized]);

  return (
    <CurrentDateContext.Provider value={{ curentDate }}>
      <div className="app">
        <Header isAuthtorized={isAuthtorized} />
        <Month
          setCurentDate={setCurentDate}
          eventList={eventList}
          isAuthtorized={isAuthtorized}
          setIsAddPopupVisible={setIsAddPopupVisible}
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
        />
        {isAddPopupVisible && <AddBirthdayPopupForm setIsAddPopupVisible={setIsAddPopupVisible} />}
        <Footer />
      </div>
    </CurrentDateContext.Provider>
  );
}
