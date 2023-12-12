import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { createNewDate } from '../../utils/functions/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { IMyDate } from '../../utils/interfaces/IMyDate.interface';
import { AddBirthdayPopupForm } from '../AddBirthdayPopupForm/AddBirthdayPopupForm';
import { getEventList } from '../../utils/Api/apiRestDbIo';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { INIT_EVENT_LIST } from '../../utils/constants';
import { ErrorMesssagePopup } from '../ErrorMesssagePopup/ErrorMesssagePopup';
import { Preloader } from '../Preloader/Preloader';

export function App() {
  const myDate: IMyDate = createNewDate(new Date());
  const [curentDate, setCurentDate] = useState(myDate);
  const [eventList, setEventList] = useState<Array<IEvent>>(INIT_EVENT_LIST);
  const [isAuthtorized, setIsAuthtorized] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(true);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>(INIT_EVENT_LIST[0]);
  const [requestError, setRequestError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthtorized) {
        setIsLoading(true);
        try {
          setEventList((await getEventList()) as IEvent[]);
        } catch (err) {
          setRequestError((err as Error).message || 'Ошибка при запросе');
          console.log(err);
        }
        setIsLoading(false);
        setNeedUpdate(false);
      }
    })();
  }, [isAuthtorized, needUpdate]);

  return (
    <CurrentDateContext.Provider value={{ curentDate }}>
      <div className="app">
        <ErrorMesssagePopup requestError={requestError} setRequestError={setRequestError} />
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Header isAuthtorized={isAuthtorized} />
            <Month
              setCurentDate={setCurentDate}
              eventList={eventList}
              isAuthtorized={isAuthtorized}
              setIsAddPopupVisible={setIsAddPopupVisible}
              currentEvent={currentEvent}
              setCurrentEvent={setCurrentEvent}
            />
            {isAddPopupVisible && (
              <AddBirthdayPopupForm
                setIsAddPopupVisible={setIsAddPopupVisible}
                currentEvent={currentEvent}
                setRequestError={setRequestError}
                setNeedUpdate={setNeedUpdate}
                setIsLoading={setIsLoading}
              />
            )}
            <Footer />
          </>
        )}
      </div>
    </CurrentDateContext.Provider>
  );
}
