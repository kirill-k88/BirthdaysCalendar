import './ErrorMesssagePopup.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store/store';
import { setRequestError } from '../store/requestErrorSlice';

export function ErrorMesssagePopup() {
  const dispatch = useDispatch();
  const { requestError } = useSelector((store: RootStore) => store.requestErrorReducer);

  const handleCloseBtnClick = () => {
    dispatch(setRequestError({ requestError: '' }));
  };

  useEffect(() => {
    if (requestError !== '') {
      setTimeout(() => {
        dispatch(setRequestError({ requestError: '' }));
      }, 2000);
    }
  }, [requestError]);

  return (
    <div className={`error-popup ${requestError !== '' && 'error-popup_show'}`}>
      <p className="error-popup__message">{requestError}</p>
      <button className="error-popup__close-btn common-button" onClick={handleCloseBtnClick}>
        ✖
      </button>
    </div>
  );
}
