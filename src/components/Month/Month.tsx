import React, { useContext } from 'react';
import './Month.scss';
import '../../utils/common-button.scss';
import { getNextMonthDate, getPreviousMonthDate } from '../../utils/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';

export function Month({ setCurentDate }: { setCurentDate: any }) {
  const { curentDate } = useContext(CurrentDateContext);

  const daysList = [];
  for (let i = 1; i <= curentDate.days + curentDate.firstDayofWeek; i++) {
    if (i < curentDate.firstDayofWeek + 1) {
      daysList.push(<div key={i}></div>);
    } else {
      daysList.push(
        <div className="month__day" key={i}>
          <p className="month__day-number">{i - curentDate.firstDayofWeek}</p>
        </div>
      );
    }
  }

  React.useEffect(() => {
    console.log(curentDate.strMonth);
  }, [curentDate]);

  const handlerButtonForward = () => {
    setCurentDate(getNextMonthDate(curentDate.date));
  };

  const handlerButtonbackword = () => {
    setCurentDate(getPreviousMonthDate(curentDate.date));
  };

  return (
    <section className="month">
      <div className="month__header-container">
        <button
          className="month__changeMonthBtn common-button"
          type="button"
          onClick={handlerButtonbackword}
        >{`<`}</button>
        <h2 className="month__header">{curentDate.strMonth || ''}</h2>
        <button
          className="month__changeMonthBtn common-button"
          type="button"
          onClick={handlerButtonForward}
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
    </section>
  );
}
