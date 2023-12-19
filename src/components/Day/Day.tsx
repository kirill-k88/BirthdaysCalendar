import './Day.scss';
import { useEffect, useState } from 'react';
import { BirthdaySign } from '../BirthdaySign/BirthdaySign';
import {
  convertMyDateToMonthDayStr,
  convertServerDateToMonthDayStr,
  convertMyDateToStr,
  createNewDate
} from '../../utils/functions/dateFunctions';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { INIT_EVENT_LIST } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store/store';
import { setCurrentEvent } from '../store/currentEventSlice';
import { setIsAddPopupVisible } from '../store/isAddPopupVisibleSlice';

export function Day({ thisDayNumber }: { thisDayNumber: number }) {
  const dispatch = useDispatch();
  const [birthdayList, setBirthdayList] = useState<IEvent[]>(INIT_EVENT_LIST);

  const { currentDate } = useSelector((store: RootStore) => store.currentDateReducer);
  const { eventList } = useSelector((store: RootStore) => store.eventListReducer);

  const nowDate = new Date();
  const thisDate = createNewDate(new Date(currentDate.year, currentDate.month - 1, thisDayNumber));

  useEffect(() => {
    const thisDayStr = convertMyDateToMonthDayStr(thisDate);
    if (eventList?.length) {
      setBirthdayList(
        eventList.filter((e: IEvent) => {
          return convertServerDateToMonthDayStr(e.birthday) === thisDayStr;
        })
      );
    }
  }, [eventList, currentDate]);

  function isToday(): boolean {
    return thisDayNumber === currentDate.day &&
      currentDate.year === nowDate.getFullYear() &&
      currentDate.month === nowDate.getMonth() + 1
      ? true
      : false;
  }

  function handleClick() {
    dispatch(
      setCurrentEvent({
        currentEvent: { ...INIT_EVENT_LIST[0], birthday: convertMyDateToStr(thisDate) }
      })
    );
    dispatch(setIsAddPopupVisible({ isAddPopupVisible: true }));
  }

  return (
    <div
      onClick={handleClick}
      className={`day ${isToday() && 'day_today'}`}
      key={new Date().getTime()}>
      <p className={`day__number ${isToday() && 'day__number_today'}`}>{thisDayNumber}</p>
      <div className="day__birthday-container">
        {birthdayList.map((e: IEvent) => {
          return <BirthdaySign event={e} key={e._id} />;
        })}
      </div>
    </div>
  );
}
