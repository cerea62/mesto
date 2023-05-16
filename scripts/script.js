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
const cardTemplate = document.querySelector('#card-template').content; //находим шаблон по его id
const popupImageElement = popupImageContainer.querySelector('.popup__image');
const popupImageCaptionElement = popupImageContainer.querySelector('.popup__image-caption');
const buttonSaveProfileElement = popupProfileElement.querySelector('.form__button-save');
const buttonSaveNewCardElement = popupNewCardElement.querySelector('.form__button-save');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const errorsList = document.querySelectorAll('.form__error');
const inputsList = document.querySelectorAll('.form__field');

//создание карточки
const createCardElement = function (item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = item.name;
    cardImageElement.src = item.link;
    cardImageElement.alt = item.name;
    // удаление карточки
    cardElement.querySelector('.card__trash').addEventListener('click', () => {
        cardElement.remove();
    });
    // добавить в избранное
    cardElement.querySelector('.card__icon').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__icon_active');
    });
    // открыть изображение
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        popupImageElement.src = item.link;
        popupImageElement.alt = item.name;
        popupImageCaptionElement.textContent = item.name;
        openPopup(popupImageContainer);
    });
    return cardElement;
}

const renderCardElement = (item, position) => {
    switch (position) {
        case 'prepend': elementsContainer.prepend(createCardElement(item));
            break;
        case 'append': elementsContainer.append(createCardElement(item));
            break;
        default: elementsContainer.prepend(createCardElement(item));
    }
};
// открытие и закрытие окна попапа

//функция открытия Popup
function openPopup(modal) {
    modal.classList.add('popup_opened');
    closePopupByClickOnEsc(modal);
    closePopupByClickOnOverlay(modal);
    resetError();

};

//функция закрытия Popup
function closePopup(modal) {
    modal.removeEventListener('keydown', setEventClosePopupKeydown);
    modal.removeEventListener('click', setEventClosePopupClick);
    modal.querySelector('form').reset();
    modal.classList.remove('popup_opened');
};

function setFormInput() { //функция заполнения инпутов 
    nameInputElement.value = profileNameElement.textContent; //записывает значение из профиля
    jobInputElement.value = profileCaptionElement.textContent; //в поля формы
};

function setPopupForm() { //функция заполнения полей в форме редактирования
    profileNameElement.textContent = nameInputElement.value
    profileCaptionElement.textContent = jobInputElement.value
};

function resetError() {  //функция сброса ошибок при открытии формы
    errorsList.forEach(evt => {
        evt.textContent = '';
    })
    inputsList.forEach(evt => {
        evt.classList.remove('form__field_status_invalid');
    })
}
// функция закрытия модальных окон по клику на крестик
buttonsClosePopup.forEach(button => {
    const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
    button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

// функция закрытия модальных окон при клике на фон
function closePopupByClickOnOverlay(item) {
    item.addEventListener('click', function (e) {
        setEventClosePopupClick(e, item);
    });
}
// функция закрытия модальных окон при нажатии esc
function closePopupByClickOnEsc(item) {
    document.addEventListener('keydown', function (e) {
        setEventClosePopupKeydown(e, item);
    });
}

// Устанавливает событие для закрытия popup при клике на фон
function setEventClosePopupClick(e, item) {
    if (e.target === e.currentTarget) {
        closePopup(item);
    }
}

// Устанавливает событие для закрытия popup при нажатии клафиши esc
function setEventClosePopupKeydown(e, item) {
    if (e.key === 'Escape') {
        closePopup(item);
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
    renderCardElement(dataCard, 'prepend');
    evt.target.reset();
    closePopup(popupNewCardElement);
};

initialCards.forEach(renderCardElement, 'append');

profileEditButtonElement.addEventListener('click', function (e) {
    setFormInput();
    openPopup(popupProfileElement);
    enableButton(buttonSaveProfileElement, configFormSelector);
});

newCardAddButtonElement.addEventListener('click', () => {
    openPopup(popupNewCardElement);
    disabledButton(buttonSaveNewCardElement, configFormSelector);
});

formEditProfileElement.addEventListener('submit', submitEditProfileForm);
formNewCardElement.addEventListener('submit', submitNewCardForm);



