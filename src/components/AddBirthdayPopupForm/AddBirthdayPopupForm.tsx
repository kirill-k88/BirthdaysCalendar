import { SubmitHandler, useForm } from 'react-hook-form';
import { IBirthday } from './AddBirthdayPopupForm.interface';
import {
  DATE_REGEXP,
  ERROR_DATE_FIELD_VALIDATION,
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

export function AddBirthdayPopupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IBirthday>({
    name: '',
    photoUrl: '',
    birthdate: new Date()
  });

  const onSubmit: SubmitHandler<IBirthday> = data => {};

  return (
    <div className="addBirthday-popup">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="addBirthday-popup__form">
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
          className="addBirthday-popup__name-field"
        />
        {errors?.name && (
          <span className="addBirthday-popup__name-field-error">{errors.name.message}</span>
        )}
        <input
          type="text"
          {...register('photoUrl', {
            required: ERROR_FIELD_IS_REQUIRED,
            pattern: {
              value: URL_REGEXP,
              message: ERROR_URL_FIELD_VALIDATION
            }
          })}
          className="addBirthday-popup__url-field"
        />
        {errors?.photoUrl && (
          <span className="addBirthday-popup__url-field-error">{errors.photoUrl.message}</span>
        )}
        <input
          type="text"
          {...register('birthdate', {
            required: ERROR_FIELD_IS_REQUIRED,
            pattern: {
              value: DATE_REGEXP,
              message: ERROR_DATE_FIELD_VALIDATION
            }
          })}
          className="addBirthday-popup__birthdate-field"
        />
        {errors?.birthdate && (
          <span className="addBirthday-popup__birthdate-field-error">
            {errors.birthdate.message}
          </span>
        )}
        <button
          disabled={!isValid}
          className="addBirthday-popup__submit-btn">
          Добавить
        </button>
      </form>
    </div>
  );
}
