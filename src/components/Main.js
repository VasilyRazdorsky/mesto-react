import React from "react";
import penIconPath from "../images/pen-icon.svg";
import plusIconPath from "../images/plus-icon.svg";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onDeleteCard, onCardClick }) => {

  const currentUser = React.useContext(CurrentUserContext);

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


  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" 
              onClick={onEditAvatar}>
          <div className="profile__avatar-mask">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </div>
        </button>
        <div className="profile__info">
          <div className="profile__info-first-line">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              aria-label="Редактировать"
              type="button"
              onClick={onEditProfile}
            >
              <img
                src={penIconPath}
                alt="Ручка"
                className="profile__pen-icon"
              />
            </button>
          </div>
          <p className="profile__more-info">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Добавить пост"
          type="button"
          onClick={onAddPlace}
        >
          <img src={plusIconPath} alt="Плюс" className="profile__plus-icon" />
        </button>
      </section>

      <section className="elements">
        {
          cards.map((cardInfo) => <Card
          key={cardInfo._id}
          card={cardInfo}
          src={cardInfo.link}
          alt={cardInfo.name}
          title={cardInfo.name}
          onCardClick = {onCardClick}
          onCardLike = {handleCardLike}
          onDeleteCard = {handleDeleteCard}
          />)
          
        }
      </section>
    </main>
  );
}

export default Main;
