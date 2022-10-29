import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {

  // Работа с контекстом currentUser
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser({
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id,
        });
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  // Работа с закрытием всех попапов

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      link: "",
      name: "",
      isOpen: false,
    });
  };

  // Работа с выбранной карточкой
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
    isOpen: false,
  });

  const handleCardClick = (link, name) => {
    setSelectedCard({
      link: link,
      name: name,
      isOpen: true,
    });
  };

  // Работа с редактированием профиля

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  function handleUpdateUser(inputValues) {
    api
      .changeUserInfo(inputValues)
      .then((res) => {
        currentUser.name = res.name;
        currentUser.about = res.about;
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // Работа с редактированием аватара

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  function handleUpdateAvatar(inputValues) {
    api
      .changeAvatar(inputValues)
      .then((res) => {
        currentUser.avatar = res.avatar;
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // Работа с отрисовкой карточек, лайками

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getCardsInfo()
      .then((cardsInfo) => {
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);
    if (isLiked) {
      api
        .deleteLikeFromPost(card._id)
        .then((newCard) => {
          setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    } else {
      api
        .addLikeOnPost(card._id)
        .then((newCard) => {
          setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }

  // Работа с удалением карточки

  const [cardToDelete, setCardToDelete] = React.useState({ test: 1 });
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card);
  };

  // Работа с добавлением карточек

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addNewCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onAgreeToDelete={handleDeleteCard}
          chosenCard={cardToDelete}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
