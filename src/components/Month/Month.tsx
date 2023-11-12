import React, { useContext } from 'react';
import './Month.scss';
import '../../utils/common-button.scss';
import {
  getNextMonthDate,
  getPreviousMonthDate,
  getNextYearDate,
  getPreviousYearDate
} from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { BirthdaySign } from '../BirthdaySign/BirthdaySign';

export function Month({ setCurentDate }: { setCurentDate: any }) {
  const { curentDate } = useContext(CurrentDateContext);

  const nowDate = new Date();

  const daysList = [];
  for (let i = 1; i <= curentDate.days + curentDate.firstDayofWeek; i++) {
    if (i < curentDate.firstDayofWeek + 1) {
      daysList.push(<div key={i}></div>);
    } else {
      daysList.push(
        <div className="month__day" key={i}>
          <p
            className={`month__day-number ${
              i - curentDate.firstDayofWeek === curentDate.day &&
              curentDate.year === nowDate.getFullYear() &&
              curentDate.month === nowDate.getMonth() + 1
                ? 'month__day-number_today'
                : ''
            }`}
          >
            {i - curentDate.firstDayofWeek}
          </p>
          <BirthdaySign
            photo={'https://ae01.alicdn.com/kf/HTB1H1r8XLBj_uVjSZFpq6A0SXXaZ.jpg'}
            info={'Ваня Иванов, 23'}
          />
        </div>
      );
    }
  }

  React.useEffect(() => {
    console.log(curentDate.strMonth);
  }, [curentDate]);

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
            onClick={handlerButtonYearBackword}
          >{`<`}</button>
          <h2 className="month__year">{curentDate.year || ''}</h2>
          <button
            className="month__changeYearBtn common-button"
            type="button"
            onClick={handlerButtonYearForward}
          >{`>`}</button>
        </div>
        <div className="month__header-container">
          <button
            className="month__changeMonthBtn common-button"
            type="button"
            onClick={handlerButtonMonthBackword}
          >{`<`}</button>
          <h2 className="month__header">{curentDate.strMonth || ''}</h2>
          <button
            className="month__changeMonthBtn common-button"
            type="button"
            onClick={handlerButtonMonthForward}
          >{`>`}</button>
        </div>
        <div className="month__day-list">
          <div className="month__week-day">
            <p className="month__week-day-name">Пн</p>
          </div>
          <div className="month__week-day">
            <p className="month__week-day-name">Вт</p>
          </div>
          <div className="month__week-day">
            <p className="month__week-day-name">Ср</p>
          </div>
          <div className="month__week-day">
            <p className="month__week-day-name">Чт</p>
          </div>
          <div className="month__week-day">
            <p className="month__week-day-name">Пт</p>
          </div>
          <div className="month__week-day">
            <p className="month__week-day-name">Сб</p>
          </div>
          <div className="month__week-day">
            <p className="month__week-day-name">Вс</p>
          </div>
          {daysList}
        </div>
      </div>
      <div className="month__side-decoration month__side-decoration_rigth"></div>
    </section>
  );
}
