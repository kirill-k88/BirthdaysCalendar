import './AddBirthdayPopupForm.scss';
import { useForm, FieldValues } from 'react-hook-form';

import {
  ERROR_FIELD_IS_REQUIRED,
  ERROR_NAME_FIELD_MAX_LENGTH,
  ERROR_NAME_FIELD_MIN_LENGTH,
  ERROR_NAME_FIELD_VALIDATION,
  ERROR_URL_FIELD_VALIDATION,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_REGEXP,
  URL_REGEXP
} from '../../utils/constants';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { changeEvent, deleteEvent, postEventToServer } from '../../utils/Api/apiRestDbIo';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { converServerDateToISO } from '../../utils/functions/dateFunctions';

export function AddBirthdayPopupForm({
  setIsAddPopupVisible,
  currentEvent,
  setRequestError,
  setNeedUpdate,
  setIsLoading
}: {
  setIsAddPopupVisible: Dispatch<SetStateAction<boolean>>;
  currentEvent: IEvent;
  setRequestError: Dispatch<SetStateAction<string>>;
  setNeedUpdate: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: currentEvent.name,
      photoUrl: currentEvent.photoUrl,
      birthday: converServerDateToISO(currentEvent.birthday)
    }
  });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      if (!currentEvent._id.length) {
        await postEventToServer(data as IEvent);
      } else {
        await changeEvent({ ...(data as IEvent), _id: currentEvent._id });
      }
      setIsAddPopupVisible(false);
      setNeedUpdate(true);
    } catch (err) {
      setRequestError((err as Error).message || 'Ошибка при запросе');
      console.log(err);
    }
    setIsLoading(false);
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await deleteEvent(currentEvent._id);
      setIsAddPopupVisible(false);
      setNeedUpdate(true);
    } catch (err) {
      setRequestError((err as Error).message || 'Ошибка при запросе');
      console.log(err);
    }
    setIsLoading(false);
  };

  const handlePopupClose = () => {
    setIsAddPopupVisible(false);
  };

  const handlePopupBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement;
    if (el?.className === 'addBirthday-popup__background') {
      setIsAddPopupVisible(false);
    }
  };

  return (
    <div className="addBirthday-popup__background" onClick={handlePopupBackgroundClick}>
      <div className="addBirthday-popup">
        <form className="addBirthday-popup__form" onSubmit={handleSubmit(onSubmit)}>
          <p className="addBirthday-popup__field-text">Имя</p>
          <input
            type="text"
            {...register('name', {
              required: ERROR_FIELD_IS_REQUIRED,
              minLength: {
                value: NAME_MIN_LENGTH,
                message: ERROR_NAME_FIELD_MIN_LENGTH
              },
              maxLength: {
                value: NAME_MAX_LENGTH,
                message: ERROR_NAME_FIELD_MAX_LENGTH
              },
              pattern: {
                value: NAME_REGEXP,
                message: ERROR_NAME_FIELD_VALIDATION
              }
            })}
            className="addBirthday-popup__field"
            placeholder="Имя"
          />
          {errors?.name && (
            <div className="addBirthday-popup__field-error">{errors.name.message?.toString()}</div>
          )}
          <p className="addBirthday-popup__field-text">Сыылка на фото</p>
          <input
            type="text"
            {...register('photoUrl', {
              required: ERROR_FIELD_IS_REQUIRED,
              pattern: {
                value: URL_REGEXP,
                message: ERROR_URL_FIELD_VALIDATION
              }
            })}
            className="addBirthday-popup__field"
            placeholder="Ссылка на фото"
          />
          {errors?.photoUrl && (
            <span className="addBirthday-popup__field-error">
              {errors.photoUrl.message?.toString()}
            </span>
          )}
          <p className="addBirthday-popup__field-text">Дата рождения</p>
          <input
            type="date"
            {...register('birthday', {
              required: ERROR_FIELD_IS_REQUIRED
            })}
            id="field"
            className="addBirthday-popup__field"
            placeholder="Дата рождения"
          />
          {errors.birthday && (
            <p className="addBirthday-popup__field-error">{errors.birthday.message?.toString()}</p>
          )}
          {currentEvent._id.length ? (
            <div className="addBirthday-popup__btn-container">
              <button
                type="submit"
                disabled={!isValid}
                className={`addBirthday-popup__submit-btn ${
                  !isValid ? 'addBirthday-popup__submit-btn_diabled' : ''
                }`}>
                Изменить
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={!isValid}
                className={`addBirthday-popup__submit-btn`}>
                Удалить
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!isValid}
              className={`addBirthday-popup__submit-btn ${
                !isValid ? 'addBirthday-popup__submit-btn_diabled' : ''
              }`}>
              Создать
            </button>
          )}
        </form>
        <button className="addBirthday-popup__close-btn" type="button" onClick={handlePopupClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
