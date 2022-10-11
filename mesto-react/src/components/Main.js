import React from "react";
import penIconPath from "../images/pen-icon.svg";
import plusIconPath from "../images/plus-icon.svg";
import api from "../utils/Api";
import Card from "./Card";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace }) => {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [cards, setCards] = React.useState([]);

  const checkIfIsLiked = (likes) => {
    likes.forEach(obj => {
      if(obj._id === userId){
        return true;
      }
    })
    return false;
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setUserId(userInfo._id);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });

    api.getCardsInfo()
      .then((cardsInfo) => {
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  


  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" 
              onClick={onEditAvatar}>
          <div className="profile__avatar-mask">
            <img
              src={userAvatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </div>
        </button>
        <div className="profile__info">
          <div className="profile__info-first-line">
            <h1 className="profile__name">{userName}</h1>
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
          <p className="profile__more-info">{userDescription}</p>
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
          src={cardInfo.link}
          alt={cardInfo.name}
          title={cardInfo.name}
          isMine={(cardInfo.owner._id === userId) ? true : false}
          likes={cardInfo.likes}
          isLiked={checkIfIsLiked(cardInfo.likes)}
          />)
          
        }
      </section>
    </main>
  );
}

export default Main;
