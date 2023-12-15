import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import './BirthdaySign.scss';

export function BirthdaySign({
  event,
  setCurrentEvent,
  setIsAddPopupVisible
}: {
  event: IEvent;
  setCurrentEvent: Dispatch<SetStateAction<IEvent>>;
  setIsAddPopupVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCurrentEvent(event);
    setIsAddPopupVisible(true);
  };

  return (
    <div className="birthday-sign" onClick={handleClick}>
      <img src={event.photoUrl} alt="Avatar" className="birthday-sign__photo" />
      <p className="birthday-sign__info">{event.name}</p>
    </div>
  );
}
