import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {

  // Работа с попапами
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

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


  // Работа с выбранной карточкой
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false
  });

  const handleCardClick = (link, name) => {
    setSelectedCard({
      link: link,
      name: name,
      isOpen: true,
    })
  }

  // Работа с контекстом currentUser
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser({
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id
        })
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  
  // Работа с редактированием профиля
  function handleUpdateUser(inputValues){
    api.changeUserInfo(inputValues)
    .then((res) => {
      currentUser.name = res.name;
      currentUser.about = res.about;
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  // Работа с редактированием аватара
  function handleUpdateAvatar(inputValues){
    api.changeAvatar(inputValues)
    .then((res) => {
      currentUser.avatar = res.avatar;
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser = {handleUpdateUser}
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

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
