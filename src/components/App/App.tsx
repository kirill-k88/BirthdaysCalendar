import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { AddBirthdayPopupForm } from '../AddBirthdayPopupForm/AddBirthdayPopupForm';
import { getEventList } from '../../utils/Api/apiRestDbIo';
import { ErrorMesssagePopup } from '../ErrorMesssagePopup/ErrorMesssagePopup';
import { Preloader } from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { setEventList } from '../store/eventListSlice';
import { setIsLoading } from '../store/isloadingSlice';
import { RootStore } from '../store/store';

export function App() {
  const [isAuthtorized, setIsAuthtorized] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(true);
  const [requestError, setRequestError] = useState<string>('');

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store: RootStore) => store.isLoadingReducer);
  const { isAddPopupVisible } = useSelector((store: RootStore) => store.isAddPopupVisibleReducer);

  useEffect(() => {
    (async () => {
      if (isAuthtorized) {
        dispatch(setIsLoading({ isLoading: true }));
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
        dispatch(setIsLoading({ isLoading: false }));
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
          <Month isAuthtorized={isAuthtorized} />
          {isAddPopupVisible && (
            <AddBirthdayPopupForm setRequestError={setRequestError} setNeedUpdate={setNeedUpdate} />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}
