import avatarPath from "../images/profile-avatar.jpg";
import penIconPath from "../images/pen-icon.svg";
import plusIconPath from "../images/plus-icon.svg";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace }) => {

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" 
              onClick={onEditAvatar}>
          <div className="profile__avatar-mask">
            <img
              src={avatarPath}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </div>
        </button>
        <div className="profile__info">
          <div className="profile__info-first-line">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button
              className="profile__edit-button"
              aria-label="Редактировать"
              type="button"
              onClick={onEditProfile}
            >
              <img
                src={penIconPath}
                alt="Ручка"
                className="profile__pen-icon"
              />
            </button>
          </div>
          <p className="profile__more-info">Исследователь океана</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить пост"
          type="button"
          onClick={onAddPlace}
        >
          <img src={plusIconPath} alt="Плюс" className="profile__plus-icon" />
        </button>
      </section>

      <section className="elements"></section>
    </main>
  );
}

export default Main;
