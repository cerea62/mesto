import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImageElement, popupImageCaptionElement) {
        super(popupSelector);
        this._popupImageElement = popupImageElement;
        this._popupImageCaptionElement = popupImageCaptionElement;
    }
    
    open(name, link) {
        this._popupImageElement.src = link;
        this._popupImageElement.alt = name;
        this._popupImageCaptionElement.textContent = name;
        super.open();
    }
}