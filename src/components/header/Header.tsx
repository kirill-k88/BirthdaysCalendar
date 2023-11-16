import './Header.scss';

export function Header({
  isAuthtorized,
  handleAuthBtn
}: {
  isAuthtorized: boolean;
  handleAuthBtn: any;
}) {
  return (
    <header className="header">
      {!isAuthtorized && (
        <button className="header__auth-btn common-button" onClick={handleAuthBtn}></button>
      )}
    </header>
  );
}
