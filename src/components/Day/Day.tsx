import './Day.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { BirthdaySign } from '../BirthdaySign/BirthdaySign';
import { useContext } from 'react';
import {
  converMyDateToMonthDayStr,
  converServerDateToMonthDayStr,
  createNewDate
} from '../../utils/dateFunctions';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { INIT_EVENT_LIST } from '../../utils/constants';

export function Day({
  eventList,
  thisDayNumber,
  setIsAddPopupVisible,
  currentEvent,
  setCurrentEvent
}: {
  eventList: IEvent[];
  thisDayNumber: number;
  setIsAddPopupVisible: Dispatch<SetStateAction<boolean>>;
  currentEvent: IEvent;
  setCurrentEvent: Dispatch<SetStateAction<IEvent>>;
}) {
  const [birthdayList, setBirthdayList] = useState<IEvent[]>(INIT_EVENT_LIST);
  const { curentDate } = useContext(CurrentDateContext);

  const nowDate = new Date();
  const thisDate = createNewDate(new Date(curentDate.year, curentDate.month - 1, thisDayNumber));

  useEffect(() => {
    const thisDayStr = converMyDateToMonthDayStr(thisDate);
    if (!!eventList.length) {
      setBirthdayList(
        eventList.filter((e: IEvent) => {
          return converServerDateToMonthDayStr(e.birthday) === thisDayStr;
        })
      );
    }
  }, [eventList, curentDate]);

  function isToday(): boolean {
    return thisDayNumber === curentDate.day &&
      curentDate.year === nowDate.getFullYear() &&
      curentDate.month === nowDate.getMonth() + 1
      ? true
      : false;
  }

  function handleClick() {
    setIsAddPopupVisible(true);
  }

  return (
    <div
      onClick={handleClick}
      className={`day ${isToday() && 'day_today'}`}
      key={new Date().getTime()}>
      <p className={`day__number ${isToday() && 'day__number_today'}`}>{thisDayNumber}</p>
      <div className="day__birthday-container">
        {birthdayList.map((e: IEvent, i) => {
          return (
            <BirthdaySign
              setCurrentEvent={setCurrentEvent}
              event={e}
              key={e._id}
            />
          );
        })}
      </div>
    </div>
  );
}
