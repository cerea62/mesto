import './index.css';
import {
    elementsSelector,
    formEditProfileElement,
    formNewCardElement,
    formEditAvatarElement,
    profileEditButtonElement,
    newCardAddButtonElement,
    avatarEditButtonElement,
    popupProfileSelector,
    popupNewCardSelector,
    popupImageSelector,
    popupUpdateAvatarSelector,
    profileNameSelector,
    profileCaptionSelector,
    profileAvatarSelector,
    popupImgElement,
    popupImageCaptionElement,
    configApi
} from '../utils/constants.js';
import {
    initialCards,
    configFormSelector
} from '../utils/elements.js'
import Card from '../components/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Popup from '../components/Popup';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Создаем экземпляр класса UserInfo, передаем в конструктор объект с именами селекторов
const userInfo = new UserInfo({ profileNameSelector, profileCaptionSelector, profileAvatarSelector });
const api = new Api(configApi);

api.getCards()
    .then((res) => {
        const cardsList = new Section({
            items: res,
            renderer: (item) => {
                cardsList.addItem(createCard(item, '#card-template', handlePopupImage));
            }
        },
            elementsSelector);

        cardsList.renderItems();
    }
    )

api.getUserInfo()
    .then((info) => {
        userInfo.setUserInfo(info);
        userInfo.setAvatar(info);
    })

function handlePopupImage(data) {
    popupImageElement.open(data.name, data.link);
}

function createCard(item, handler, selector) {

    const card = new Card(item, handler, selector);

    const cardElement = card.generateCard();
    return cardElement;
}

// const cardsList = new Section({
//     items: initialCards,
//     renderer: (item) => {
//         cardsList.addItem(createCard(item, '#card-template', handlePopupImage));
//     }
// },
//     elementsSelector);

// cardsList.renderItems();

// попап редактирования карточек
const popupNewCardElement = new PopupWithForm({
    handleFormSubmit: (newCardData) => {
        cardsList.addItem(createCard(newCardData, '#card-template', handlePopupImage));
    },
    popupSelector: popupNewCardSelector
});

// попап редактирования аватара
const popupUpdateAvatarElement = new PopupWithForm({
    handleFormSubmit: (avatar) => {
        api.editAvatar(avatar)
            .then((avatar) => {
                userInfo.setAvatar(avatar)
            })
    },
    popupSelector: popupUpdateAvatarSelector
});



// Создаем экземпляр класса формы редактированя профиля, конструктор - функция обработки сабмита, селектор попапа 
const popupProfileElement = new PopupWithForm({
    handleFormSubmit: (profileData) => {
        api.editUserInfo(profileData)
            .then((profileData) => {
                userInfo.setUserInfo(profileData)
            })
    },
    popupSelector: popupProfileSelector
});

const popupImageElement = new PopupWithImage(popupImageSelector, popupImgElement, popupImageCaptionElement);

// Устанавливаем слушателей один раз для каждого экземпляра класса
popupNewCardElement.setEventListeners();
popupImageElement.setEventListeners();
popupProfileElement.setEventListeners();
popupUpdateAvatarElement.setEventListeners();

profileEditButtonElement.addEventListener('click', function () {
    newProfileValidation.resetError();
    formEditProfileElement.reset();
    newProfileValidation.enableButton();
    const userData = userInfo.getUserInfo();
    popupProfileElement.setInputValues(userData);
    popupProfileElement.open();
});

newCardAddButtonElement.addEventListener('click', () => {
    newCardValidation.resetError();
    formNewCardElement.reset();
    newCardValidation.disableButton();
    popupNewCardElement.open();
});
avatarEditButtonElement.addEventListener('click', () => {
    newCardValidation.resetError();
    formNewCardElement.reset();
    newCardValidation.disableButton();
    popupUpdateAvatarElement.open();
})
const newProfileValidation = new FormValidator(configFormSelector, formEditProfileElement);
const newCardValidation = new FormValidator(configFormSelector, formNewCardElement);
const editAvatarValidation = new FormValidator(configFormSelector, formEditAvatarElement);

newProfileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarValidation.enableValidation();

