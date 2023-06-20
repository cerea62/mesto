export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector)
    }
    open() {
        this._popup.classList.add('popup_opened');
    }
    close() {
        this._popup.classList.remove('popup_opened');
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
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })
        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt);
        })
    }
}