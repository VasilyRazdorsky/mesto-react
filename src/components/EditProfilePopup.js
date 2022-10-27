import React from "react";
import closeIconPath from "../images/close-icon.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const [name, setName] = React.useState("");

    function handleNameChange(e){
        setName(e.target.value);
    }

    const [description, setDescription] = React.useState("");

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        })
    }

    return (
        <section className={`popup popup_action_edit ${isOpen ? "popup_active" : ""}`}>
          <div className="popup__container">
            <button
              className="popup__close-button popup__close-button_place_add-post-popup"
              aria-label="Закрыть редактирование"
              type="button"
              onClick={onClose}
            >
              <img
                src={closeIconPath}
                alt="Кнопка закрыть"
                className="popup__close-icon"
              />
            </button>

            <h2 className="popup__header">Редактировать профиль</h2>

            <form
              action="#"
              className="popup__form popup__form_place_add-post-popup"
              name="edit-profile"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Имя"
                className="popup__input popup__input_text_profile-name"
                id="name-input"
                required
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
              />
              <span className="popup__error name-input-error"></span>
              <input
                type="text"
                name="moreInfo"
                placeholder="О себе"
                className="popup__input popup__input_text_profile-more-info"
                id="info-input"
                required
                minLength="2"
                maxLength="200"
                value={description}
                onChange={handleDescriptionChange}
              />
              <span className="popup__error info-input-error"></span>
              <button type="submit" className="popup__save-button">
                Сохранить
              </button>
            </form>
          </div>
        </section>
    );
}

export default EditProfilePopup;