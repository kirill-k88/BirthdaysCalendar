import './Month.scss';
import { useContext, useLayoutEffect } from 'react';
import {
  getNextMonthDate,
  getPreviousMonthDate,
  getNextYearDate,
  getPreviousYearDate
} from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { WEEKDAY_LIST } from '../../utils/constants';
import { Day } from '../Day/Day';

export function Month({
  setCurentDate,
  eventList,
  isAuthtorized
}: {
  setCurentDate: any;
  eventList: object[];
  isAuthtorized: boolean;
}) {
  const { curentDate } = useContext(CurrentDateContext);

  function getDayElementList(): JSX.Element[] {
    const daysList: JSX.Element[] = [];

    for (let i = 1; i <= curentDate.days + curentDate.firstDayofMonth; i++) {
      if (i < curentDate.firstDayofMonth + 1) {
        daysList.push(<div key={i}></div>);
      } else {
        daysList.push(
          <Day
            key={i}
            eventList={eventList}
            thisDayNumber={i - curentDate.firstDayofMonth}></Day>
        );
      }
    }

    return daysList;
  }

  function getWeekDayElementList(): JSX.Element[] {
    const weekDayList: JSX.Element[] = [];

    WEEKDAY_LIST.forEach((day, index) => {
      weekDayList.push(
        <div
          className="month__week-day"
          key={index}>
          <p
            className={`month__week-day-name ${
              index === 5 || index === 6 ? 'month__week-day-name_hollyday' : ''
            }`}>
            {day}
          </p>
        </div>
      );
    });

    return weekDayList;
  }

  const handlerButtonMonthForward = () => {
    setCurentDate(getNextMonthDate(curentDate.date));
  };

  const handlerButtonMonthBackword = () => {
    setCurentDate(getPreviousMonthDate(curentDate.date));
  };

  const handlerButtonYearForward = () => {
    setCurentDate(getNextYearDate(curentDate.date));
  };

  const handlerButtonYearBackword = () => {
    setCurentDate(getPreviousYearDate(curentDate.date));
  };

  useLayoutEffect(() => {
    //Получить события календаря и расставить их в текущем месяце
    if (isAuthtorized && !!eventList.length) {
      console.log('eventList ==> ', eventList);
    }
  }, [eventList, isAuthtorized]);

  return (
    <section className="month">
      <div className="month__side-decoration month__side-decoration_left"></div>
      <div className="month__day-list-container">
        <div className="month__year-container">
          <button
            className="month__changeYearBtn common-button"
            type="button"
            onClick={handlerButtonYearBackword}>{`<`}</button>
          <h2 className="month__year noselect">{curentDate.year || ''}</h2>
          <button
            className="month__changeYearBtn common-button"
            type="button"
            onClick={handlerButtonYearForward}>{`>`}</button>
        </div>
        <div className="month__header-container">
          <button
            className="month__changeMonthBtn common-button"
            type="button"
            onClick={handlerButtonMonthBackword}>{`<`}</button>
          <h2 className="month__header noselect">{curentDate.strMonth || ''}</h2>
          <button
            className="month__changeMonthBtn common-button"
            type="button"
            onClick={handlerButtonMonthForward}>{`>`}</button>
        </div>
        <div className="month__day-list">
          {getWeekDayElementList()}
          {getDayElementList()}
        </div>
      </div>
      <div className="month__side-decoration month__side-decoration_rigth"></div>
    </section>
  );
}
