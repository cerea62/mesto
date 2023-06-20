export default class Card {
    constructor(data, templateSelector, handlePopupImage) {
        this._data = data;
        this._name = data.place;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handlePopupImage = handlePopupImage;
    }
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const cardImageElement = this._element.querySelector('.card__image');
        this._element.querySelector('.card__title').textContent = this._name;
        cardImageElement.src = this._link;
        cardImageElement.alt = this._name;
        return this._element;
    }
    _deleteCard() {          //удаление карточки
        this._element.remove();
    }
    
    _setLike() {          //установка и удаление сердечка
        this._buttonLike.classList.toggle('card__icon_active');
    }

    _setEventListeners() {
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._deleteCard();
        })
        this._buttonLike = this._element.querySelector('.card__icon');
        this._buttonLike.addEventListener('click', () => {
            this._setLike();
        });
        //открытие попапа при клике на картинку
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handlePopupImage(this._data);
        });
    }
};
