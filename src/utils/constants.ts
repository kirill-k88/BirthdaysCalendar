export const MONTH_LIST = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

export const WEEKDAY_LIST = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const CLIENT_ID = '814196209554-aiqekn1vi5f19im35qns5vahsrs5dd4m.apps.googleusercontent.com';
export const API_KEY = 'AIzaSyCiilWGEA3cQtSnt5Uc1Efrf5IZSJ16ntQ';
export const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
export const GAPI_SCRIPT_URL = 'https://apis.google.com/js/client.js';
export const GSI_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

export const ERROR_FIELD_IS_REQUIRED = 'Поле обязательно для заполнения';

export const NAME_MIN_LENGTH = 2;
export const ERROR_NAME_FIELD_MIN_LENGTH = `Минимальная количество символов ${NAME_MIN_LENGTH}`;
export const NAME_MAX_LENGTH = 15;
export const ERROR_NAME_FIELD_MAX_LENGTH = `Максимальная количество символов ${NAME_MAX_LENGTH}`;
export const NAME_REGEXP = new RegExp('[А-Яа-яёЁ.]+');
export const ERROR_NAME_FIELD_VALIDATION = 'Допускаются только крилические буквы и точка';
export const URL_REGEXP = new RegExp(
  '^((http(s)?://)?[w.-]+(.[w.-]+)+([w.,@?^=%&:/~+#-]*[w@?^=%&/~+#-])?)+$'
);
export const ERROR_URL_FIELD_VALIDATION = 'Неправильно указана ссылка на фото';
export const DATE_REGEXP = new RegExp(`^[\d]{1,2}.[\d]{1,2}.[\d]{4}$`);
export const ERROR_DATE_FIELD_VALIDATION = 'Неправильно задана дата рождения';
