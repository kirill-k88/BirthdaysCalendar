import './Month.scss';
import { WEEKDAY_LIST } from '../../utils/constants';
import { Day } from '../Day/Day';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../store/store';

import {
  setCurrentDateNextMonth,
  setCurrentDatePreviousMonth,
  setCurrentDateNextYear,
  setCurrentDatePreviousYear
} from '../store/currentDateSlice';

export function Month({ isAuthtorized }: { isAuthtorized: boolean }) {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((store: RootStore) => store.currentDateReducer);

  function getDayElementList(): JSX.Element[] {
    const daysList: JSX.Element[] = [];

    for (let i = 1; i <= currentDate.days + currentDate.firstDayofMonth; i++) {
      if (i < currentDate.firstDayofMonth + 1) {
        daysList.push(<div key={new Date().getTime() + i}></div>);
      } else {
        daysList.push(
          <Day key={new Date().getTime() + i} thisDayNumber={i - currentDate.firstDayofMonth}></Day>
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
    dispatch(setCurrentDateNextMonth());
  };

  const handlerButtonMonthBackword = () => {
    dispatch(setCurrentDatePreviousMonth());
  };

  const handlerButtonYearForward = () => {
    dispatch(setCurrentDateNextYear());
  };

  const handlerButtonYearBackword = () => {
    dispatch(setCurrentDatePreviousYear());
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
          <h2 className="month__year noselect">{currentDate.year || ''}</h2>
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
          <h2 className="month__header noselect">{currentDate.strMonth || ''}</h2>
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
