import React from "react";

const PopupWithForm = (props) => {
    return (
        <section className={`popup popup_action_${props.name}`}>
          <div className="popup__container">
            <button
              className="popup__close-button popup__close-button_place_add-post-popup"
              aria-label="Закрыть редактирование"
              type="button"
            >
              <img
                src={closeIconPath}
                alt="Кнопка закрыть"
                className="popup__close-icon"
              />
            </button>

            <h2 className="popup__header">{props.title}</h2>

            <form
              action="#"
              className="popup__form popup__form_place_add-post-popup"
              name="add-post"
              noValidate
            >
              <input
                type="text"
                name="postName"
                value=""
                placeholder="Название"
                className="popup__input popup__input_text_post-name"
                id="post-name-input"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="popup__error post-name-input-error"></span>
              <input
                type="url"
                name="link"
                value=""
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_text_post-img-href"
                id="url-input"
                required
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

export default PopupWithForm;