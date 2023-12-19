import { MouseEvent } from 'react';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import './BirthdaySign.scss';
import { useDispatch } from 'react-redux';
import { setCurrentEvent } from '../store/currentEventSlice';
import { setIsAddPopupVisible } from '../store/isAddPopupVisibleSlice';

export function BirthdaySign({ event }: { event: IEvent }) {
  const dispatch = useDispatch();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(setCurrentEvent({ currentEvent: event }));
    dispatch(setIsAddPopupVisible({ isAddPopupVisible: true }));
  };

  return (
    <div className="birthday-sign" onClick={handleClick}>
      <img src={event.photoUrl} alt="Avatar" className="birthday-sign__photo" />
      <p className="birthday-sign__info">{event.name}</p>
    </div>
  );
}
