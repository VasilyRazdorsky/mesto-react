import React from "react";
import closeIconPath from "../images/close-icon.svg";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    
    const [avatarLinkValue, setAvatarLinkValue] = React.useState("");
    const avatarLinkRef = React.useRef();

    function handleLinkInputChange(e){
        setAvatarLinkValue(e.target.value);
    }


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarLinkRef.current.value,
        })
        setAvatarLinkValue("");
    }

    return (
        <section className={`popup popup_action_change-avatar ${isOpen ? "popup_active" : ""}`}>
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

            <h2 className="popup__header">Обновить аватар</h2>

            <form
              action="#"
              className="popup__form popup__form_place_add-post-popup"
              name="change-avatar"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                type="url"
                name="avatarLink"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_text_avatar-img-href"
                id="avatar-input"
                ref={avatarLinkRef}
                value={avatarLinkValue}
                onChange={handleLinkInputChange}
                required
              />
              <span className="popup__error avatar-input-error"></span> 
              <button type="submit" className="popup__save-button">
                Сохранить
              </button>
            </form>
          </div>
        </section>
    );
}

export default EditAvatarPopup;