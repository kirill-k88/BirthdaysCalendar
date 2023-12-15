import './Day.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BirthdaySign } from '../BirthdaySign/BirthdaySign';
import {
  converMyDateToMonthDayStr,
  converServerDateToMonthDayStr,
  convertMyDateToStr,
  createNewDate
} from '../../utils/functions/dateFunctions';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import { INIT_EVENT_LIST } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { RootStore } from '../store/store';

export function Day({
  thisDayNumber,
  setIsAddPopupVisible,
  setCurrentEvent
}: {
  thisDayNumber: number;
  setIsAddPopupVisible: Dispatch<SetStateAction<boolean>>;
  setCurrentEvent: Dispatch<SetStateAction<IEvent>>;
}) {
  const [birthdayList, setBirthdayList] = useState<IEvent[]>(INIT_EVENT_LIST);

  const { curentDate } = useSelector((store: RootStore) => store.currentDateReducer);
  const { eventList } = useSelector((store: RootStore) => store.eventListReducer);

  const nowDate = new Date();
  const thisDate = createNewDate(new Date(curentDate.year, curentDate.month - 1, thisDayNumber));

  useEffect(() => {
    const thisDayStr = converMyDateToMonthDayStr(thisDate);
    if (eventList?.length) {
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
    setCurrentEvent({ ...INIT_EVENT_LIST[0], birthday: convertMyDateToStr(thisDate) });
    setIsAddPopupVisible(true);
  }

  return (
    <div
      onClick={handleClick}
      className={`day ${isToday() && 'day_today'}`}
      key={new Date().getTime()}>
      <p className={`day__number ${isToday() && 'day__number_today'}`}>{thisDayNumber}</p>
      <div className="day__birthday-container">
        {birthdayList.map((e: IEvent) => {
          return (
            <BirthdaySign
              setCurrentEvent={setCurrentEvent}
              event={e}
              setIsAddPopupVisible={setIsAddPopupVisible}
              key={e._id}
            />
          );
        })}
      </div>
    </div>
  );
}
