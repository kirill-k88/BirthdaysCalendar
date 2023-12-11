import { Dispatch, SetStateAction } from 'react';
import { IEvent } from '../../utils/interfaces/IEvent.interface';
import './BirthdaySign.scss';

export function BirthdaySign({
  event,
  setCurrentEvent
}: {
  event: IEvent;
  setCurrentEvent: Dispatch<SetStateAction<IEvent>>;
}) {
  const handleClick = () => {
    console.log(event);

    setCurrentEvent(event);
  };

  return (
    <div
      className="birthday-sign"
      onClick={handleClick}>
      <img
        src={event.photoUrl}
        alt="Avatar"
        className="birthday-sign__photo"
      />
      <p className="birthday-sign__info">{event.name}</p>
    </div>
  );
}
