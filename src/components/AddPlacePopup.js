import React from "react";
import closeIconPath from "../images/close-icon.svg";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [postName, setPostName] = React.useState("");

    function handleSetPostName(e){
        setPostName(e.target.value);
    }

    const [link, setLink] = React.useState("");

    function handleSetLink(e){
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
            postName,
            link,
        });
        setPostName("");
        setLink("");
    }

    return (
        <section className={`popup popup_add-post ${isOpen ? "popup_active" : ""}`}>
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

            <h2 className="popup__header">Новое место</h2>

            <form
              action="#"
              className="popup__form popup__form_place_add-post-popup"
              name="edit-profile"
              noValidate
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="postName"
                placeholder="Название"
                className="popup__input popup__input_text_post-name"
                id="post-name-input"
                required
                minLength="2"
                maxLength="30"
                value={postName}
                onChange={handleSetPostName}
              />
              <span className="popup__error post-name-input-error"></span>
              <input
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_text_post-img-href"
                id="url-input"
                required
                value={link}
                onChange={handleSetLink}
              />
              <span className="popup__error url-input-error"></span>
              <button type="submit" className="popup__save-button">
                Сохранить
              </button>
            </form>
          </div>
        </section>
    );
}

export default AddPlacePopup;