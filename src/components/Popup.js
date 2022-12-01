export default class Popup {
  constructor(popupSelector) {
    this._pageElement = document.querySelector('.root');
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Закрыть попап на Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Открыть попап
  open() {
    this._pageElement.classList.add('page_not-scrolled');
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрыть попап
  close() {
    this._pageElement.classList.remove('page_not-scrolled');
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handlePopupMouseDown(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  // Устанавливает слушатели событий
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._handlePopupMouseDown.bind(this));
  }
}