import React, { useState, useContext } from 'react';
import { api } from "../../utils/Api";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({onEditAvatar, onAddPlace, onEditProfile, onCardClick, cards, onCardDelete, onCardLike }) {

  const currentUserInfo = useContext(CurrentUserContext);
  return (

    <main className="content">

      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-container">
          <img className="profile__avatar" src={currentUserInfo.avatar} alt="Аватар профиля" />
          <div className="profile__overlay">
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__titles">
            <h1 className="profile__name">{currentUserInfo.name}</h1>
            <p className="profile__description">{currentUserInfo.about}</p>
          </div>
          <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
        </div>

        <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить элемент"></button>
      </section>

      <section className="elements">
        {
          cards.map(item => (
          <Card
            card={item}
            owner={item.owner}
            link={item.link}
            likes={item.likes}
            name={item.name}
            key={item._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />)
          )
        }
      </section>

    </main>
  )
}

export default Main;
