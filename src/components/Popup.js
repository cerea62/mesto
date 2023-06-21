export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            this.close();
        }
    }
    _handleOverlayClose(e) {
        if (e.target === e.currentTarget) {
            this.close()
        }
    }
    setEventListeners() {
        const buttonClose = this._popup.querySelector('.popup__close');
        buttonClose.addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        })
    }
}