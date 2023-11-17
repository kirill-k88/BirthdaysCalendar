import './BirthdaySign.scss';

export function BirthdaySign({ photo, info }: { photo: string; info: string }) {
  return (
    <div className="birthday-sign">
      <img
        src={photo}
        alt="Avatar"
        className="birthday-sign__photo"
      />
      <p className="birthday-sign__info">{info}</p>
    </div>
  );
}
