import './Day.scss';
import { useEffect, useState } from 'react';
import { CurrentDateContext } from '../../contexts/CurrentDateContext';
import { BirthdaySign } from '../BirthdaySign/BirthdaySign';
import { useContext } from 'react';
import { convertMyDateToStr, createNewDate } from '../../utils/dateFunctions';

export function Day({
  eventList,
  thisDayNumber,
  setIsAddPopupVisible
}: {
  eventList: object[];
  thisDayNumber: number;
  setIsAddPopupVisible: any;
}) {
  const [birthdayList, setBirthdayList] = useState<any[]>([]);
  const { curentDate } = useContext(CurrentDateContext);

  const nowDate = new Date();
  const thisDate = createNewDate(new Date(curentDate.year, curentDate.month - 1, thisDayNumber));

  useEffect(() => {
    const thisDayStr = convertMyDateToStr(thisDate);
    if (!!eventList.length) {
      setBirthdayList(
        eventList.filter((e: any) => e.start.date === thisDayStr && e.summary.indexOf('ДР') === 0)
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
        {birthdayList.map((e: any, i) => {
          return (
            <BirthdaySign
              photo={e.location}
              info={e.summary.replace('ДР ', '')}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
