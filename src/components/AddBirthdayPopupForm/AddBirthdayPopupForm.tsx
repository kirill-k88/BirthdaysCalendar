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
import { MouseEvent } from 'react';
import { postEventToServer } from '../../utils/Api/apiRestDbIo';
import { IEvent } from '../../utils/interfaces/IEvent.interface';

export function AddBirthdayPopupForm({ setIsAddPopupVisible }: { setIsAddPopupVisible: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    try {
      postEventToServer(data as IEvent);
      setIsAddPopupVisible(false);
    } catch (err) {
      console.log(err);
    }
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
    <div
      className="addBirthday-popup__background"
      onClick={handlePopupBackgroundClick}>
      <div className="addBirthday-popup">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="addBirthday-popup__form">
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
          <button
            disabled={!isValid}
            className={`addBirthday-popup__submit-btn ${
              !isValid ? 'addBirthday-popup__submit-btn_diabled' : ''
            }`}>
            Отправить
          </button>
          <button
            disabled={!isValid}
            className={`addBirthday-popup__submit-btn ${
              !isValid ? 'addBirthday-popup__submit-btn_diabled' : ''
            }`}>
            Удалить
          </button>
        </form>
        <button
          className="addBirthday-popup__close-btn"
          type="button"
          onClick={handlePopupClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
