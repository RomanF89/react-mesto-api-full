import React, { useRef } from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarLinkRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLinkRef.current.value
    });
  }

  React.useEffect(() => {
    avatarLinkRef.current.form.reset();
  }, [isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} name="change-avatar" title="Обновить аватар" isOpen={isOpen}
      onClose={onClose} submitButtonText="Сохранить" >
      <fieldset className="popup__field-container">
        <input id="avatar-link" name="link" type="url" className="popup__field popup__field_type_change-avatar"
          placeholder="Ссылка на картинку" required ref={avatarLinkRef} />
        <span id="avatar-link-error" className="popup__error-message popup__error-message_visible"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
