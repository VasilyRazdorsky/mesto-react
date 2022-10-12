import React from "react";

const Card = ({src, alt, title, isMine, likes, onCardClick}) => {

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
                      className={`element__like-button`}
                      aria-label="Оценить пост"
                      type="button"
                    ></button>
                    <p className="element__like-counter">{likes.length}</p>
                </div>
            </div>
            {
                isMine ? <button
                className="element__remove-button"
                aria-label="Удалить пост"
                type="button"
                ></button> : <></>
            }
            
        </div>
    );
}

export default Card;