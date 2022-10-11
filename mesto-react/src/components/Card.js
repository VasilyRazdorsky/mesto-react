import React from "react";

const Card = ({id, src, alt, title}) => {
    return (
        <div key={id} className="element">
            <button
                className="element__view-button"
                aria-label="Посмотреть фото"
                type="button"
            >
                <img src={src} alt={alt} className="element__photo" />
            </button>
            <div className="element__info">
                <h2 className="element__name">{title}</h2>
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
    );
}

export default Card;