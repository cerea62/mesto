export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export class Card {
    constructor(data, templateSelector, handlePopupImage) {
        this._data = data;
        this._name = data.name;
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
    _setEventListeners() {
        //удаление карточки
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._element.remove();
        });
        //установка и удаление сердечка
        this._element.querySelector('.card__icon').addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__icon_active');
        });
        //открытие попапа при клике на картинку
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handlePopupImage(this._data);
        });
    }
};
