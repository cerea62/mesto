import Popup from "./Popup.js";
import {popupImageElement, popupImageCaptionElement} from '../utils/constants.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageElement = popupImageElement;
        this._popupImageCaptionElement = popupImageCaptionElement;
    }
    
    open(name, link) {
        this._popupImageElement.src = link;
        this._popupImageElement.alt = name;
        this._popupImageCaptionElement.textContent = name;
        this._popup.classList.add('popup_opened');
    }
}