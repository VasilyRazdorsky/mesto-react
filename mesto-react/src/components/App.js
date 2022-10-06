import closeIconPath from "../images/close-icon.svg";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="page__container">
        <Header />
        <Main />
        <Footer />

        <section className="popup popup_action_edit">
          <div className="popup__container">
            <button
              className="popup__close-button popup__close-button_place_edit-popup"
              aria-label="Закрыть редактирование"
              type="button"
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
              className="popup__form popup__form_place_edit-popup"
              name="edit-profile"
              noValidate
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
              />
              <span className="popup__error info-input-error"></span>
              <button type="submit" className="popup__save-button">
                Сохранить
              </button>
            </form>
          </div>
        </section>

        <section className="popup popup_action_add-post">
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

            <h2 className="popup__header">Новое место</h2>

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

        <section className="popup popup_action_delete-card">
          <div className="popup__container">
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

            <h2 className="popup__header popup__header_place_delete-card">
              Вы уверены?
            </h2>
            <button className="popup__save-button popup__save-button_place_delete-card">
              Да
            </button>
          </div>
        </section>

        <section className="popup popup_action_change-avatar">
          <div className="popup__container">
            <button
              className="popup__close-button popup__close-button_place_change-avatar-popup"
              aria-label="Закрыть редактирование"
              type="button"
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
              className="popup__form popup__form_place_change-avatar-popup"
              name="change-avatar"
              noValidate
            >
              <input
                type="url"
                name="avatarLink"
                value=""
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_text_avatar-img-href"
                id="avatar-input"
                required
              />
              <span className="popup__error avatar-input-error"></span>
              <button type="submit" className="popup__save-button">
                Сохранить
              </button>
            </form>
          </div>
        </section>
      </div>

      <template className="element-template">
        <div className="element">
          <button
            className="element__view-button"
            aria-label="Посмотреть фото"
            type="button"
          >
            <img src="#" alt="#" className="element__photo" />
          </button>
          <div className="element__info">
            <h2 className="element__name"></h2>
            <div className="element__like-container">
              <button
                className="element__like-button"
                aria-label="Оценить пост"
                type="button"
              ></button>
              <p className="element__like-counter">0</p>
            </div>
          </div>
          <button
            className="element__remove-button"
            aria-label="Удалить пост"
            type="button"
          ></button>
        </div>
      </template>
    </>
  );
}

export default App;
