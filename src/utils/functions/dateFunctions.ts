import { IMyDate } from '../interfaces/IMyDate.interface';
import {
  addMonths,
  getDaysInMonth,
  startOfMonth,
  getDay,
  addYears,
  startOfYear,
  endOfYear
} from 'date-fns';
import { MONTH_LIST } from '../constants';

export function getNextMonthDate(date: Date): IMyDate {
  return createNewDate(addMonths(date, 1));
}

export function getPreviousMonthDate(date: Date): IMyDate {
  return createNewDate(addMonths(date, -1));
}

export function getNextYearDate(date: Date): IMyDate {
  return createNewDate(addYears(date, 1));
}

export function getPreviousYearDate(date: Date): IMyDate {
  return createNewDate(addYears(date, -1));
}

export function createNewDate(date: Date): IMyDate {
  return {
    date,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    strMonth: MONTH_LIST[date.getMonth()] || '',
    days: getDaysInMonth(date),
    day: date.getDate(),
    firstDayofMonth: getDay(startOfMonth(date)) === 0 ? 6 : getDay(startOfMonth(date)) - 1
  };
}

export function getStartOfYear(date: Date): Date {
  return startOfYear(date);
}

export function getEndOfYear(date: Date): Date {
  return endOfYear(date);
}

export function convertMyDateToStr(date: IMyDate): string {
  return `${date.year}-${date.month < 10 ? '0' + date.month : date.month}-${
    date.day < 10 ? '0' + date.day : date.day
  }T00:00:00.000Z`;
}

export function convertMyDateToMonthDayStr(date: IMyDate): string {
  return `${date.month < 10 ? '0' + date.month : date.month}-${
    date.day < 10 ? '0' + date.day : date.day
  }`;
}

export function convertServerDateToMonthDayStr(date: string): string {
  const datePart = date.split('T')[0];
  const month = datePart.split('-')[1];
  const day = datePart.split('-')[2];

  return `${month}-${day}`;
}

export function convertServerDateToISO(date: string): string {
  return date.split('T')[0];
}
