import Popup from "./Popup.js";
import {popupImageElement, popupImageCaptionElement} from '../utils/constants.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElement = popupImageElement;
        this._popupImageCaptionElement = popupImageCaptionElement;
    }
    
    open(place, link) {
        this._popupImageElement.src = link;
        this._popupImageElement.alt = place;
        this._popupImageCaptionElement.textContent = place;
        super.open();
    }
}