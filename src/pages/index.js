import './index.css';
import {
    elementsSelector,
    nameInputElement,
    jobInputElement,
    formEditProfileElement,
    formNewCardElement,
    profileEditButtonElement,
    newCardAddButtonElement,
    popupProfileSelector,
    popupNewCardSelector,
    popupImageSelector,
    profileNameSelector,
    profileCaptionSelector
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
import UserInfo from '../components/UserInfo.js';

function handlePopupImage(data) {
    popupImageElement.open(data.name, data.link);
}

function createCard(item, selector, handler) {
    const card = new Card(item, selector, handler);
    const cardElement = card.generateCard();
    return cardElement;
}

const CardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        CardsList.addItem(createCard(item, '#card-template', handlePopupImage));
    }
},
    elementsSelector);

CardsList.renderItems();

const popupNewCardElement = new PopupWithForm({
    handleFormSubmit: (newCardData) => {
        CardsList.addItem(createCard(newCardData, '#card-template', handlePopupImage));
    },
    popupSelector: popupNewCardSelector
});

// Создаем экземпляр класса UserInfo, передаем в конструктор объект с именами селекторов
const userInfo = new UserInfo({ profileNameSelector: profileNameSelector, profileCaptionSelector: profileCaptionSelector });

// Создаем экземпляр класса формы редактированя профиля, конструктор - функция обработки сабмита, селектор попапа 
const popupProfileElement = new PopupWithForm({
    handleFormSubmit: (profileData) => {
        userInfo.setUserInfo(profileData);
    },
    popupSelector: popupProfileSelector
});

const popupImageElement = new PopupWithImage(popupImageSelector);

// Устанавливаем слушателей один раз для каждого экземпляра класса
popupNewCardElement.setEventListeners();
popupImageElement.setEventListeners();
popupProfileElement.setEventListeners();

function setProfileInputs() {
    const userData = userInfo.getUserInfo();
    nameInputElement.value = userData.name;
    jobInputElement.value = userData.caption;
}
profileEditButtonElement.addEventListener('click', function () {
    newProfileValidation.resetError();
    formEditProfileElement.reset();
    newProfileValidation.enableButton();
    setProfileInputs();
    popupProfileElement.open();
});

newCardAddButtonElement.addEventListener('click', () => {
    newCardValidation.resetError();
    formNewCardElement.reset();
    newCardValidation.disableButton();
    popupNewCardElement.open();
});

const newProfileValidation = new FormValidator(configFormSelector, formEditProfileElement);
const newCardValidation = new FormValidator(configFormSelector, formNewCardElement);

newProfileValidation.enableValidation();
newCardValidation.enableValidation();


