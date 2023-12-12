import './Month.scss';
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  getNextMonthDate,
  getPreviousMonthDate,
  getNextYearDate,
  getPreviousYearDate
} from '../../utils/functions/dateFunctions';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { WEEKDAY_LIST } from '../../utils/constants';
import { Day } from '../Day/Day';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { IMyDate } from '../../utils/interfaces/IMyDate.interface';

export function Month({
  setCurentDate,
  eventList,
  isAuthtorized,
  setIsAddPopupVisible,
  currentEvent,
  setCurrentEvent
}: {
  setCurentDate: Dispatch<SetStateAction<IMyDate>>;
  eventList: IEvent[];
  isAuthtorized: boolean;
  setIsAddPopupVisible: Dispatch<SetStateAction<boolean>>;
  currentEvent: IEvent;
  setCurrentEvent: Dispatch<SetStateAction<IEvent>>;
}) {
  const { curentDate } = useContext(CurrentDateContext);

  function getDayElementList(): JSX.Element[] {
    const daysList: JSX.Element[] = [];

    for (let i = 1; i <= curentDate.days + curentDate.firstDayofMonth; i++) {
      if (i < curentDate.firstDayofMonth + 1) {
        daysList.push(<div key={new Date().getTime() + i}></div>);
      } else {
        daysList.push(
          <Day
            key={new Date().getTime() + i}
            eventList={eventList}
            thisDayNumber={i - curentDate.firstDayofMonth}
            setIsAddPopupVisible={setIsAddPopupVisible}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}></Day>
        );
      }
    }

    return daysList;
  }

  function getWeekDayElementList(): JSX.Element[] {
    const weekDayList: JSX.Element[] = [];

    WEEKDAY_LIST.forEach((day, index) => {
      weekDayList.push(
        <div className="month__week-day" key={new Date().getTime() + index}>
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
