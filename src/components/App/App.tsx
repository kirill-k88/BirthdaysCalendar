import './App.scss';
import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Month } from '../Month/Month';
import { AddBirthdayPopupForm } from '../AddBirthdayPopupForm/AddBirthdayPopupForm';
import { getEventListFetch } from '../../utils/Api/apiRestDbIo';
import { ErrorMesssagePopup } from '../ErrorMesssagePopup/ErrorMesssagePopup';
import { Preloader } from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { setEventList, setNeedUpdateEventList } from '../store/eventListSlice';
import { setIsLoading } from '../store/isloadingSlice';
import { RootStore } from '../store/store';
import { setRequestError } from '../store/requestErrorSlice';

export function App() {
  const [isAuthtorized, setIsAuthtorized] = useState(true);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store: RootStore) => store.isLoadingReducer);
  const { isAddPopupVisible } = useSelector((store: RootStore) => store.isAddPopupVisibleReducer);
  const { needUpdateEventList } = useSelector((store: RootStore) => store.eventListReducer);

  useEffect(() => {
    (async () => {
      if (isAuthtorized) {
        dispatch(setIsLoading({ isLoading: true }));
        try {
          dispatch(
            setEventList({
              eventList: await getEventListFetch()
            })
          );
        } catch (err) {
          dispatch(
            setRequestError({ requestError: (err as Error).message || 'Ошибка при запросе' })
          );
          console.log(err);
        }
        dispatch(setIsLoading({ isLoading: false }));
        dispatch(setNeedUpdateEventList({ needUpdateEventList: false }));
      }
    })();
  }, [isAuthtorized, needUpdateEventList]);

  return (
    <div className="app">
      <ErrorMesssagePopup />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header isAuthtorized={isAuthtorized} />
          <Month isAuthtorized={isAuthtorized} />
          {isAddPopupVisible && <AddBirthdayPopupForm />}
          <Footer />
        </>
      )}
    </div>
  );
}
