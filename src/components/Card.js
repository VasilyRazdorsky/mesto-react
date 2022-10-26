import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({card, src, alt, title, onCardClick, onCardLike, onDeleteCard}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser.id;
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    function handleOnCardClick() {
        onCardClick(src, title);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onDeleteCard(card);
    }

    return (
        <div className="element">
            <button
                className="element__view-button"
                aria-label="Посмотреть фото"
                type="button"
                onClick={handleOnCardClick}
            >
                <img src={src} alt={alt} className="element__photo" />
            </button>
            <div className="element__info">
                <h2 className="element__name">{title}</h2>
                <div className="element__like-container">
                    <button
                      className={`element__like-button ${isLiked ? "element__like-button_active" : ""}`}
                      aria-label="Оценить пост"
                      type="button"
                      onClick={handleLikeClick}
                    ></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
            {
                isOwn ? <button
                className="element__remove-button"
                aria-label="Удалить пост"
                type="button"
                onClick={handleDeleteClick}
                ></button> : <></>
            }
            
        </div>
    );
}

export default Card;