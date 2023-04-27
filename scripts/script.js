// открытие и закрытие окна попапа
//объявление переменных
const popupProfileElement = document.querySelector('.popup_box_edit-profile'); //окно попапа редактирования профиля
const popupNewPlaceElement = document.querySelector('.popup_box_new-place'); //окно попапа добавления нового места
const editButtonProfileElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
const addButtonNewPlaceElement = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const closeButtonPopupProfilelement = popupProfileElement .querySelector('.popup__close'); //кнопка закрытия попапа редактирования профиля
const closeButtonPopupNewPlacelement = popupNewPlaceElement.querySelector('.popup__close'); //кнопка закрытия окна добавления нового места
const formElement = document.querySelector('.form');
const nameInputElement = formElement.querySelector('.form__field_type_name');
const jobInputElement = formElement.querySelector('.form__field_type_job');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');

function openPopupProfile() { //функция открытия попапа окна редактирования
    profileNameElement.value = nameInputElement.textContent; //записывает значение из профиля
    profileCaptionElement.value = jobInputElement.textContent; //в поля формы
    popupProfileElement.classList.add('popup_opened');
};

function closePopupProfile() { //функция закрытия попапа окна редактирования
    popupProfileElement.classList.remove('popup_opened');
};

function openPopupNewPlace() { //функция открытия попапа окна добавления места
    popupNewPlaceElement.classList.add('popup_opened');
};

function closePopupNewPlace() {
    popupNewPlaceElement.classList.remove('popup_opened');
};

function handleFormSubmit(evt) { //обработчик формы отправки, пока не работает
    evt.preventDefault();
    profileNameElement.textContent = nameInputElement.value
    profileCaptionElement.textContent = jobInputElement.value
    closePopupProfile();
};

editButtonProfileElement.addEventListener('click', openPopupProfile);
closeButtonPopupProfilelement.addEventListener('click', closePopupProfile);

addButtonNewPlaceElement.addEventListener('click', openPopupNewPlace);
closeButtonPopupNewPlacelement .addEventListener('click', closePopupNewPlace);
formElement.addEventListener('submit', handleFormSubmit);
