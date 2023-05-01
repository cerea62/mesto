//объявление переменных
const content = document.querySelector('.content');
const popupElement = document.querySelector('.popup');
const popupProfileElement = document.querySelector('.popup_type_edit-profile'); //окно попапа редактирования профиля
const popupNewCardElement = document.querySelector('.popup_type_new-card'); //окно попапа добавления нового места
const popupImageContainer = document.querySelector('.popup_type_image'); //модальное окно с изображением
const editButtonProfileElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
const addButtonNewCardElement = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const openPopupImageElement = document.querySelectorAll('.card__image'); //картинка для открытия окна с изображением
const formEditProfileElement = document.querySelector('.form_type_edit-profile');
const formNewCardElement = document.querySelector('.form_type_new-card');
const nameInputElement = formEditProfileElement.querySelector('.form__field_type_name');
const jobInputElement = formEditProfileElement.querySelector('.form__field_type_job');
const placeInputElement = formNewCardElement.querySelector('.form__field_type_place');
const linkInputElement = formNewCardElement.querySelector('.form__field_type_link');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');

const initialCards = [
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
const elementsContainer = document.querySelector('.elements__items'); //находим контейнер, в который будем класть карточки
const cardTemplate = document.querySelector('#card-template').content; //находим шаблон по его id
//создание карточки
const createCardElement = function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
// удаление карточки
    cardElement.querySelector('.card__trash').addEventListener('click', () => {
        cardElement.remove();
    });
// добавить в избранное
    cardElement.querySelector('.card__icon').addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__icon_active');
    });
    elementsContainer.append(cardElement);
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
content.addEventListener('click', closePopupButton);
function closePopupButton(evt) {
    const closeButton = evt.target;
    if (closeButton.classList.contains('popup__close')) {
        const currentPopup = closeButton.closest('.popup')
        closePopup(currentPopup);
    };
};

function getFormValuesAdd() {
    return {
        name: placeInputElement.value,
        link: linkInputElement.value
    }
    };

//открытие изображения при клике на карточку
elementsContainer.addEventListener('click', openImage);
function openImage(evt) {
    const openImageClick = evt.target;
    const openImageCaption = openImageClick.parentNode.querySelector('.card__title');
    if (openImageClick.classList.contains('card__image')) {
        const popupImageElement = popupImageContainer.querySelector('.popup__image');
        const popupImageCaptionElement = popupImageContainer.querySelector('.popup__image-caption');
        popupImageElement.src = openImageClick.currentSrc;
        popupImageCaptionElement.textContent = openImageCaption.textContent;
        popupImageContainer.classList.add('popup_opened');
    };
};

function handleFormSubmit(evt) { //обработчик формы отправки
    evt.preventDefault();
    setPopupForm();
    closePopup(popupProfileElement);
};

initialCards.forEach(createCardElement);

editButtonProfileElement.addEventListener('click', function () { 
    setFormInput();
    openPopup(popupProfileElement)
});

addButtonNewCardElement.addEventListener('click', () => 
openPopup(popupNewCardElement));

formEditProfileElement.addEventListener('submit', handleFormSubmit);

 function handleFormSubmitadd(evt) { //обработчик формы отправки
     evt.preventDefault();
     const dataCard = getFormValuesAdd();
     renderCardElement(dataCard);
     closePopup(popupNewCardElement);
 };
 formNewCardElement.addEventListener('submit', handleFormSubmitadd);


