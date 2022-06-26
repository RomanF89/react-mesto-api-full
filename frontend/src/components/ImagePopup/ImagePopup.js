
function ImagePopup({card, link, name, onClose}) {
  return  <section className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
  <div className="popup__container">
    <button className="popup__close-button" onClick = {onClose} type="button" aria-label="Закрыть окно"></button>
    <figure className="popup__image-figure">
      <img className="popup__image" src={link} alt={name}/>
      <figcaption className="popup__image-caption">{name}</figcaption>
    </figure>
  </div>
</section>
}
export default ImagePopup;
