import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({card, src, alt, title, onCardClick}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser.id;
    const isLiked = card.likes.some(i => i._id === currentUser.id);
    const cardLikeButtonClassName = isLiked ? `element__like-button element__like-button_active` : `element__like-button`;

    function handleClick() {
        onCardClick(src, title);
    }

    return (
        <div className="element">
            <button
                className="element__view-button"
                aria-label="Посмотреть фото"
                type="button"
                onClick={handleClick}
            >
                <img src={src} alt={alt} className="element__photo" />
            </button>
            <div className="element__info">
                <h2 className="element__name">{title}</h2>
                <div className="element__like-container">
                    <button
                      className={cardLikeButtonClassName}
                      aria-label="Оценить пост"
                      type="button"
                    ></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
            {
                isOwn ? <button
                className="element__remove-button"
                aria-label="Удалить пост"
                type="button"
                ></button> : <></>
            }
            
        </div>
    );
}

export default Card;