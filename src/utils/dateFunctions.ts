import { dateType } from './dateType';
import { addMonths, getDaysInMonth, startOfMonth, getDay, addYears } from 'date-fns';
import { MONTH_LIST } from './constants';

export function getNextMonthDate(date: Date): dateType {
  return createNewDate(addMonths(date, 1));
}

export function getPreviousMonthDate(date: Date): dateType {
  return createNewDate(addMonths(date, -1));
}

export function getNextYearDate(date: Date): dateType {
  return createNewDate(addYears(date, 1));
}

export function getPreviousYearDate(date: Date): dateType {
  return createNewDate(addYears(date, -1));
}

export function createNewDate(date: Date): dateType {
  return {
    date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    strMonth: MONTH_LIST[date.getMonth()] || '',
    days: getDaysInMonth(date),
    day: date.getDate(),
    firstDayofWeek: getDay(startOfMonth(date)) === 0 ? 6 : getDay(startOfMonth(date)) - 1
  };
}
