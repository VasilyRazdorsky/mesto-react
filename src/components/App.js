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
import AddPlacePopup from "./AddPlacePopup";

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

  // Работа с отрисовкой карточек, лайками, удалением карточек

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getCardsInfo()
      .then((cardsInfo) => {
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id);
    if(isLiked){
      api.deleteLikeFromPost(card._id)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
    } else {
      api.addLikeOnPost(card._id)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
    }
  }

  function handleDeleteCard(card){
    api.deleteCard(card._id)
    .then((res) => {
      setCards(cards.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
  }

  // Работа с добавлением карточек
  function handleAddPlaceSubmit(cardInfo){
    api.addNewCard(cardInfo)
    .then((newCard) => {
      setCards([newCard, ...cards]);
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
          cards = {cards}
          onCardLike = {handleCardLike}
          onCardDelete = {handleDeleteCard}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser = {handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
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
