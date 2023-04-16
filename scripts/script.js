// открытие и закрытие окна попапа
//объявление переменных
const popupElement = document.querySelector('.popup'); //окно попапа
const editButtonProfileElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
const closeButtonPopupElement = popupElement.querySelector('.popup__close'); //кнопка закрытия
const formElement = document.querySelector('.form');
const nameInputElement = formElement.querySelector('.form__field_type_name');
const jobInputElement = formElement.querySelector('.form__field_type_job');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');

function openPopup() { //функция открытия попапа
    profileNameElement.value = nameInputElement.textContent; //записывает значение из профиля
    profileCaptionElement.value = jobInputElement.textContent; //в поля формы
    popupElement.classList.add('popup_opened');
};

function closePopup() { //функция закрытия попапа
    popupElement.classList.remove('popup_opened');
};

function handleFormSubmit(evt) { //обработчик формы отправки, пока не работает
    evt.preventDefault();
    profileNameElement.textContent = nameInputElement.value
    profileCaptionElement.textContent = jobInputElement.value
    closePopup();
};

editButtonProfileElement.addEventListener('click', openPopup);
closeButtonPopupElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
