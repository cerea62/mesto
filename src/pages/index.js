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
    popupConfirmationSelector,
    popupUpdateAvatarSelector,
    profileNameSelector,
    profileCaptionSelector,
    profileAvatarSelector,
    apiConfig
} from '../utils/constants.js';
import { configFormSelector } from '../utils/elements.js'
import Card from '../components/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

// Создаем экземпляр класса UserInfo, передаем в конструктор объект с именами селекторов
const userInfo = new UserInfo({ profileNameSelector, profileCaptionSelector, profileAvatarSelector });

// Создаем экземпляр класса Api
const api = new Api(apiConfig);

// создаем экземляр класса Section
const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item, handlePopupImage, '#card-template'));
    }
},
    elementsSelector);

// попап редактирования карточек
const popupNewCardElement = new PopupWithForm({
    handleFormSubmit: (newCardData) => {
        popupNewCardElement.setSavingStatus(true);
        api.addCard(newCardData)
            .then((newCardData) => {
                cardsList.addItem(createCard(newCardData, handlePopupImage, '#card-template'));
                popupNewCardElement.close();
            })
            .catch((err) => {
                console.log(`Ошибка добавления карточки: ${err}`);
            })
            .finally(() => {
                popupNewCardElement.setSavingStatus(false);
            }
            )
    },
    popupSelector: popupNewCardSelector
});

// попап редактирования аватара
const popupUpdateAvatarElement = new PopupWithForm({
    handleFormSubmit: (avatar) => {
        popupUpdateAvatarElement.setSavingStatus(true);
        api.editAvatar(avatar)
            .then((avatar) => {
                userInfo.setAvatar(avatar);
                popupUpdateAvatarElement.close();
            })
            .catch((err) => {
                console.log(`Ошибка редактирования аватарки: ${err}`);
            })
            .finally(() => {
                popupUpdateAvatarElement.setSavingStatus(false);
            }
            )
    },
    popupSelector: popupUpdateAvatarSelector
});

// попап с подтверждением удаления карточки
const popupConfirmationElement = new PopupWithConfirmation(popupConfirmationSelector);

// попап с картинкой
const popupImageElement = new PopupWithImage(popupImageSelector);

// попап редактирования профиля
const popupProfileElement = new PopupWithForm({
    handleFormSubmit: (profileData) => {
        popupProfileElement.setSavingStatus(true);
        api.editUserInfo(profileData)
            .then((profileData) => {
                userInfo.setUserInfo(profileData);
                popupProfileElement.close();

            })
            .catch((err) => {
                console.log(`Ошибка редактирования профиля: ${err}`);
            })
            .finally(() => {
                popupProfileElement.setSavingStatus(false);
            }
            )
    },
    popupSelector: popupProfileSelector
});

let userId = null;
Promise.all([api.getCards(), api.getUserInfo()])
    .then(([cardsData, userData]) => {
        userInfo.setUserInfo(userData);
        userInfo.setAvatar(userData);
        userId = userData._id;
        cardsList.renderItems(cardsData.reverse());
    })
    .catch((err) => {
        console.log(`Ошибка получения данных: ${err}`);
    });

function handlePopupImage(data) {
    popupImageElement.open(data.name, data.link);
}

function createCard(item, handler, selector) {

    const card = new Card({
        data: item,
        userId: userId,
        templateSelector: selector,
        handlePopupImage: handler,
        handleDeleteCard: (cardID) => {
            popupConfirmationElement.open();
            popupConfirmationElement.setCallback(() => {
                api.deleteCard(cardID)
                    .then((cardID) => {
                        card.deleteCard(cardID)
                        popupConfirmationElement.close();
                    })
                    .catch((err) => {
                        console.log(`Ошибка удаления карточки: ${err}`);
                    });
            })
        },
        handleChangeLike: (cardData) => {
            api.changeLike(cardData.getCardId(), cardData.isLiked())
                .then((data) => {
                    card.setLike(data);
                })
                .catch((err) => {
                    console.log(`Ошибка при изменении лайка: ${err}`);
                });
        }
    });
    const cardElement = card.generateCard();
    return cardElement;
}

// Устанавливаем слушатели один раз для каждого экземпляра класса
popupNewCardElement.setEventListeners();
popupImageElement.setEventListeners();
popupProfileElement.setEventListeners();
popupUpdateAvatarElement.setEventListeners();
popupConfirmationElement.setEventListeners();

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
// Валидация формы
const newProfileValidation = new FormValidator(configFormSelector, formEditProfileElement);
const newCardValidation = new FormValidator(configFormSelector, formNewCardElement);
const editAvatarValidation = new FormValidator(configFormSelector, formEditAvatarElement);

newProfileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarValidation.enableValidation();

