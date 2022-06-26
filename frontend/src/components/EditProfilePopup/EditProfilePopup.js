import React, { useState, useContext } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit" title="Редактировать профиль" isOpen={isOpen}
      onClose={onClose} submitButtonText="Сохранить" >
      <fieldset className="popup__field-container">
        <input id="user-name" name="name" type="text" className="popup__field popup__field_type_name" placeholder="Имя"
          required minLength="2" maxLength="40" value={name || " "} onChange={handleChangeName} />
        <span id="user-name-error" className="popup__error-message popup__error-message_visible"></span>
        <input id="user-description" name="description" type="text" className="popup__field popup__field_type_description"
          required minLength="2" maxLength="200" placeholder="Описание" value={description || " "} onChange={handleChangeDescription} />
        <span id="user-description-error" className="popup__error-message popup__error-message_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
