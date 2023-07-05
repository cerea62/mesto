import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElement = this._popup.querySelector('.popup__image')
        this._popupImageCaptionElement = this._popup.querySelector('.popup__image-caption');
    }
    
    open(name, link) {
        this._popupImageElement.src = link;
        this._popupImageElement.alt = name;
        this._popupImageCaptionElement.textContent = name;
        super.open();
    }
}