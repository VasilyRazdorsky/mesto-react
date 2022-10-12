import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false
  });



  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleDeleteCardClick = () => {
    setIsDeleteCardPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      link: "",
      name: "",
      isOpen: false,
    })
  }

  const handleCardClick = (link, name) => {
    setSelectedCard({
      link: link,
      name: name,
      isOpen: true,
    })
  }

  return (
    <>
      <div className="page__container">
        <Header />
        <Main 
        onEditAvatar= {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onDeleteCard = {handleDeleteCardClick}
        onCardClick = {handleCardClick}
        />
        <Footer />

        <PopupWithForm 
          title="Редактировать профиль"
          name="edit"
          isOpen={isEditProfilePopupOpen}
          children={
            <>
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
            </>
          }
          onClose={closeAllPopups}
          submitButtonText="Сохранить"
        />

        <PopupWithForm
          title="Новое место"
          name="add-post"
          isOpen={isAddPlacePopupOpen}
          children={
            <>
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
            </>
          }
          onClose={closeAllPopups}
          submitButtonText="Сохранить"
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={isDeleteCardPopupOpen}
          children={
            <></>
          }
          onClose={closeAllPopups}
          submitButtonText="Да"
        />

        <PopupWithForm
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isEditAvatarPopupOpen}
          children={
            <>
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
            </>
          }
          onClose={closeAllPopups}
          submitButtonText="Сохранить"
        />

        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        />
      </div>
    </>
  );
}

export default App;
