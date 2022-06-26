function PopupWithForm({name, isOpen, onSubmit, onClose, submitButtonText, title, children}) {

  return (
  <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container">
      <form name={`popup-form_${name}`} onSubmit={onSubmit} className="popup__form">
        <button onClick = {onClose} className="popup__close-button" type="button" aria-label="Закрыть окно"></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__submit-button" aria-label="Сохранить">{submitButtonText}</button>
      </form>
    </div>
  </section>
  )
}

export default PopupWithForm;
