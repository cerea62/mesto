//объявление переменных
const popupProfileElement = document.querySelector('.popup_type_edit-profile'); //окно попапа редактирования профиля
const popupNewCardElement = document.querySelector('.popup_type_new-card'); //окно попапа добавления нового места
const popupImageContainer = document.querySelector('.popup_type_image'); //модальное окно с изображением
const profileEditButtonElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
const newCardAddButtonElement = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const popupImageElement = document.querySelectorAll('.card__image'); //картинка для открытия окна с изображением
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
        const cardImageClick = evt.target;
        const cardImageElement = cardImageClick.closest('.card');
        const cardImageCaption = cardImageElement.querySelector('.card__title');
        const popupImageElement = popupImageContainer.querySelector('.popup__image');
        const popupImageCaptionElement = popupImageContainer.querySelector('.popup__image-caption');
        popupImageElement.src = cardImageClick.currentSrc;
        popupImageCaptionElement.textContent = cardImageCaption.textContent;
        popupImageContainer.classList.add('popup_opened');
    });
    return cardElement;
}

const renderCardElement = (item) => {
    elementsContainer.prepend(createCardElement(item));
}
// открытие и закрытие окна попапа

//функция открытия Popup
function openPopup(modal) {
    modal.classList.add('popup_opened');
};

//функция закрытия Popup
function closePopup(modal) {
    modal.classList.remove('popup_opened');
};

function setFormInput() { //функция заполнения инпутов 
    profileNameElement.value = nameInputElement.textContent; //записывает значение из профиля
    profileCaptionElement.value = jobInputElement.textContent; //в поля формы
};

function setPopupForm() { //функция заполнения полей в форме редактирования
    profileNameElement.textContent = nameInputElement.value
    profileCaptionElement.textContent = jobInputElement.value
};
// функция закрытия модальных окон по клику на крестик
document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
    button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

function getFormValuesAdd() {
    return {
        name: placeInputElement.value,
        link: linkInputElement.value
    };

};

function handleFormSubmit(evt) { //обработчик формы отправки
    evt.preventDefault();
    setPopupForm();
    closePopup(popupProfileElement);
};

function handleFormSubmitadd(evt) { //обработчик формы отправки
    evt.preventDefault();
    const dataCard = getFormValuesAdd();
    renderCardElement(dataCard);
    placeInputElement.value = '';
    linkInputElement.value = '';
    closePopup(popupNewCardElement);
};

initialCards.forEach(renderCardElement);

profileEditButtonElement.addEventListener('click', function () {
    setFormInput();
    openPopup(popupProfileElement);
});

newCardAddButtonElement.addEventListener('click', () =>
    openPopup(popupNewCardElement));

formEditProfileElement.addEventListener('submit', handleFormSubmit);
formNewCardElement.addEventListener('submit', handleFormSubmitadd);


