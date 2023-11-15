import React, { useContext } from 'react';
import './Month.scss';
import {
  getNextMonthDate,
  getPreviousMonthDate,
  getNextYearDate,
  getPreviousYearDate
} from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { BirthdaySign } from '../BirthdaySign/BirthdaySign';
import { WEEKDAY_LIST } from '../../utils/constants';

export function Month({ setCurentDate }: { setCurentDate: any }) {
  const { curentDate } = useContext(CurrentDateContext);

  const nowDate = new Date();

  function getDayElementList(): JSX.Element[] {
    const daysList: JSX.Element[] = [];
    for (let i = 1; i <= curentDate.days + curentDate.firstDayofWeek; i++) {
      if (i < curentDate.firstDayofWeek + 1) {
        daysList.push(<div key={i}></div>);
      } else {
        daysList.push(
          <div
            className={`month__day ${
              i - curentDate.firstDayofWeek === curentDate.day &&
              curentDate.year === nowDate.getFullYear() &&
              curentDate.month === nowDate.getMonth() + 1
                ? 'month__day_today'
                : ''
            }`}
            key={i}>
            <p className="month__day-number">{i - curentDate.firstDayofWeek}</p>
            <div className="month__day-birthday-container">
              <BirthdaySign
                photo={
                  'https://i.pinimg.com/originals/17/92/06/179206d058b1ed5877d221d6e84f2b38.jpg'
                }
                info={'Маша.К'}
              />
              {/*               <BirthdaySign
                photo={
                  'https://i.pinimg.com/originals/17/92/06/179206d058b1ed5877d221d6e84f2b38.jpg'
                }
                info={'Ваня.И'}
              /> */}
              <BirthdaySign
                photo={
                  'https://i.pinimg.com/originals/17/92/06/179206d058b1ed5877d221d6e84f2b38.jpg'
                }
                info={'Галя.Р'}
              />
            </div>
          </div>
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
          <p className="month__week-day-name">{day}</p>
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
