//объявление переменных
const popupProfileElement = document.querySelector('.popup_type_edit-profile'); //окно попапа редактирования профиля
const popupNewCardElement = document.querySelector('.popup_type_new-card'); //окно попапа добавления нового места
const popupImageContainer = document.querySelector('.popup_type_image'); //модальное окно с изображением
const profileEditButtonElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
const newCardAddButtonElement = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const formEditProfileElement = document.querySelector('.form_type_edit-profile');
const formNewCardElement = document.querySelector('.form_type_new-card');
const nameInputElement = formEditProfileElement.querySelector('.form__field_type_name');
const jobInputElement = formEditProfileElement.querySelector('.form__field_type_job');
const placeInputElement = formNewCardElement.querySelector('.form__field_type_place');
const linkInputElement = formNewCardElement.querySelector('.form__field_type_link');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const elementsContainer = document.querySelector('.elements__items'); //находим контейнер, в который будем класть карточки
// const cardTemplate = document.querySelector('#card-template').content; //находим шаблон по его id
const popupImageElement = popupImageContainer.querySelector('.popup__image');
const popupImageCaptionElement = popupImageContainer.querySelector('.popup__image-caption');
const buttonSaveProfileElement = popupProfileElement.querySelector('.form__button-save');
const buttonSaveNewCardElement = popupNewCardElement.querySelector('.form__button-save');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

import { initialCards, Card } from './card.js'
import { resetError, configFormSelector, enableButton, disabledButton } from './validate.js';

function handlePopupImage(data) {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupImageCaptionElement.textContent = data.name;
    popupImageContainer.addEventListener('click', closePopupByClickOnOverlay);
    openPopup(popupImageContainer);
}

const createCard = (item) => {
    const card = new Card(item, '#card-template', handlePopupImage);
    const cardElement = card.generateCard();
    elementsContainer.prepend(cardElement);
}
initialCards.forEach((item) => {
    createCard(item);
});

// открытие и закрытие окна попапа

//функция открытия Popup
function openPopup(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByClickOnEsc);

};

//функция закрытия Popup
function closePopup(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByClickOnEsc);
};

function setFormInput() { //функция заполнения инпутов 
    nameInputElement.value = profileNameElement.textContent; //записывает значение из профиля
    jobInputElement.value = profileCaptionElement.textContent; //в поля формы
};

function setPopupForm() { //функция заполнения полей в форме редактирования
    profileNameElement.textContent = nameInputElement.value
    profileCaptionElement.textContent = jobInputElement.value
};

// функция закрытия модальных окон по клику на крестик
buttonsClosePopup.forEach(button => {
    const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
    button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

// функция закрытия модальных окон при нажатии esc
const closePopupByClickOnEsc = (evt) => {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        const popupIsActive = document.querySelector('.popup_opened');
        closePopup(popupIsActive);
    };
}

const closePopupByClickOnOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
        const popupIsActive = document.querySelector('.popup_opened');
        closePopup(popupIsActive);
    }
}

function getFormValuesAdd() {
    return {
        name: placeInputElement.value,
        link: linkInputElement.value
    };

};

function submitEditProfileForm(evt) { //обработчик формы отправки
    evt.preventDefault();
    setPopupForm();
    closePopup(popupProfileElement);
};

function submitNewCardForm(evt) { //обработчик формы отправки
    evt.preventDefault();
    const dataCard = getFormValuesAdd();
    createCard(dataCard);
    evt.target.reset();
    closePopup(popupNewCardElement);
};



profileEditButtonElement.addEventListener('click', function () {
    resetError(formEditProfileElement, configFormSelector);
    setFormInput();
    popupProfileElement.addEventListener('click', closePopupByClickOnOverlay);
    openPopup(popupProfileElement);
    enableButton(buttonSaveProfileElement, configFormSelector);
});

newCardAddButtonElement.addEventListener('click', () => {
    resetError(formNewCardElement, configFormSelector);
    popupNewCardElement.addEventListener('click', closePopupByClickOnOverlay);
    openPopup(popupNewCardElement);
    disabledButton(buttonSaveNewCardElement, configFormSelector);
});

formEditProfileElement.addEventListener('submit', submitEditProfileForm);
formNewCardElement.addEventListener('submit', submitNewCardForm);



