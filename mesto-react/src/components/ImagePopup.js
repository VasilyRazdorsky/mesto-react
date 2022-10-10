import React from "react";

function ImagePopup() {
    return (
        <section className="popup popup_action_view-post">
          <div className="popup__container popup__container_place_view-post-popup">
            <button
              className="popup__close-button popup__close-button_place_view-post-popup"
              aria-label="Закрыть редактирование"
              type="button"
            >
              <img
                src={closeIconPath}
                alt="Кнопка закрыть"
                className="popup__close-icon"
              />
            </button>

            <img src="#" alt="#" className="popup__photo" />
            <p className="popup__photo-place"></p>
          </div>
        </section>
    );
}