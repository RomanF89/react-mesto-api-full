
function InfoTooltip({currentInfoTooltip, onClose}) {
  return (
    <section className={`popup popup_type_info-tooltip ${currentInfoTooltip.isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container">
      <form name="popup-form_info-tooltip" className="popup__form">
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        <img className="popup__tooltip-image" src={currentInfoTooltip.infoImage}></img>
        <h2 className="popup__title popup__title_type_info-tooltip">{currentInfoTooltip.message}</h2>
      </form>
    </div>
  </section>
  )
}

export default InfoTooltip;
