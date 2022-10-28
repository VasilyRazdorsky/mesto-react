import React from "react";
import closeIconPath from "../images/close-icon.svg";

const DeleteCardPopup = ({ isOpen, onClose, onAgreeToDelete, chosenCard }) => {
  function handleSubmit(e) {
    e.preventDefault();
    onAgreeToDelete(chosenCard);
  }

  return (
    <section
      className={`popup popup_action_delete-card ${
        isOpen ? "popup_active" : ""
      }`}
    >
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

        <h2 className="popup__header">Вы уверены?</h2>

        <form
          action="#"
          className="popup__form popup__form_place_add-post-popup"
          name="change-avatar"
          onSubmit={handleSubmit}
          noValidate
        >
          <button type="submit" className="popup__save-button">
            Да
          </button>
        </form>
      </div>
    </section>
  );
};

export default DeleteCardPopup;
