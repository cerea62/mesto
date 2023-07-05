export default class Card {
    constructor({ data, userId, templateSelector, handlePopupImage, handleDeleteCard, handleChangeLike }) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userId = userId;
        this._ownerCard = data.owner._id;

        this._templateSelector = templateSelector;
        this._handlePopupImage = handlePopupImage;
        this._handleDeleteCard = handleDeleteCard;
        this._handleChangeLike = handleChangeLike;
    }
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content;
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    isLiked() {
        return this._likes.some((user) => {
            return this._userId === user._id;
        })
    }

    _updateLike() {
        this._likeCounter.textContent = this._likes.length;

        if (this.isLiked()) {
            this._buttonLike.classList.add('card__icon_active')
        }
        else {
            this._buttonLike.classList.remove('card__icon_active')
        }

    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImageElement = this._element.querySelector('.card__image');
        this._buttonDelete = this._element.querySelector('.card__trash');
        this._buttonLike = this._element.querySelector('.card__icon');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._updateLike();
        this._element.querySelector('.card__title').textContent = this._name;
        this._checkCardOwner();
        cardImageElement.src = this._link;
        cardImageElement.alt = this._name;
        return this._element;
    }

    deleteCard() {          //удаление карточки
        this._element.remove();
        this._element = null;
    }

    setLike(dataCard) {
        this._likes = dataCard.likes;
        this._likeCounter.textContent = this._likes.length;
        console.log(this._likes);
        this._buttonLike.classList.toggle('card__icon_active');
    }

    _checkCardOwner() {

        if (this._ownerCard !== this._userId) {
            this._buttonDelete.remove();
        }
    }

    getCardId() {
        return this._data._id;
    }

    _setEventListeners() {
        this._element.querySelector('.card__trash').addEventListener('click', () => {
            this._handleDeleteCard(this.getCardId());
        })
        this._buttonLike = this._element.querySelector('.card__icon');
        this._buttonLike.addEventListener('click', () => {
            this._handleChangeLike(this);
        });
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handlePopupImage(this._data);
        });
    }
};
