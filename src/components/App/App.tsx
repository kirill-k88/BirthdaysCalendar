import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { AddBirthdayPopupForm } from '../AddBirthdayPopupForm/AddBirthdayPopupForm';
import { getEventList } from '../../utils/Api/apiRestDbIo';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { INIT_EVENT_LIST } from '../../utils/constants';
import { ErrorMesssagePopup } from '../ErrorMesssagePopup/ErrorMesssagePopup';
import { Preloader } from '../Preloader/Preloader';
import { useDispatch } from 'react-redux';
import { setEventList } from '../store/eventListSlice';

export function App() {
  const [isAuthtorized, setIsAuthtorized] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(true);
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>(INIT_EVENT_LIST[0]);
  const [requestError, setRequestError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isAuthtorized) {
        setIsLoading(true);
        try {
          dispatch(
            setEventList({
              eventList: await getEventList()
            })
          );
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
    <div className="app">
      <ErrorMesssagePopup requestError={requestError} setRequestError={setRequestError} />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header isAuthtorized={isAuthtorized} />
          <Month
            isAuthtorized={isAuthtorized}
            setIsAddPopupVisible={setIsAddPopupVisible}
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
  );
}
