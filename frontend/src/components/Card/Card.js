import React, { useContext } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Card({owner, link, name, card, likes, onCardClick, onCardDelete, onCardLike}) {

  const currentUserInfo = useContext(CurrentUserContext);

  const isOwn = owner === currentUserInfo._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );

  const isLiked = likes.some(i => i === currentUserInfo._id);
  const cardLikeButtonClassName = `element__like
    ${isLiked ? 'element__like_active' : 'element__like_non-active'}`;

  function handleClick() {
    onCardClick(link, name)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteCardClick() {
    onCardDelete(card)
  }

  return (
    <article className="element">
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить карточку" onClick={handleDeleteCardClick} ></button>
      <img className="element__mask-group" src={link} alt={name} onClick={handleClick} />
      <div className="element__group">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-area">
          <button type="button" className={cardLikeButtonClassName} aria-label="Поставить лайк" onClick={handleLikeClick} ></button>
          <span className="element__like-count" aria-label="Количество лайков">{likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
