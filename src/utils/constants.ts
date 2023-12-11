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

export const ERROR_FIELD_IS_REQUIRED = 'Поле обязательно для заполнения';
export const NAME_MIN_LENGTH = 2;
export const ERROR_NAME_FIELD_MIN_LENGTH = `Минимальная количество символов ${NAME_MIN_LENGTH}`;
export const NAME_MAX_LENGTH = 15;
export const ERROR_NAME_FIELD_MAX_LENGTH = `Максимальная количество символов ${NAME_MAX_LENGTH}`;
export const NAME_REGEXP = new RegExp('[А-Яа-яёЁ.]+');
export const ERROR_NAME_FIELD_VALIDATION = 'Допускаются только крилические буквы и точка';
export const URL_REGEXP =
  /https?:\/\/(www.)?[-a-zA-Z0-9@:%._~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/i;
export const ERROR_URL_FIELD_VALIDATION = 'Неправильно указана ссылка на фото';
export const DATE_REGEXP = /[0-9]{2,}.[0-9]{2,}.[0-9]{4}/;
export const ERROR_DATE_FIELD_VALIDATION = 'Неправильно задана дата рождения';

export const RESTDB_URL_PATH = 'https://calendardb-346c.restdb.io/rest';
export const API_KEY = '6576ef11143264d61f37d3c8';
export const API_RESTDB_HEADERS = {
  'Content-Type': 'application/json',
  'x-apikey': API_KEY
};

export const INIT_EVENT_LIST = [
  {
    _id: '',
    name: '',
    photoUrl: '',
    birthday: ''
  }
];
