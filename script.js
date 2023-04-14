// открытие и закрытие окна попапа
const popupElement = document.querySelector('.popup'); //окно попапа
const editButtonProfileElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
const closeButtonPopupElement = popupElement.querySelector('.popup__close'); //кнопка закрытия
const saveButtonPopupElement = popupElement.querySelector('.popup__save');

function openPopup() { //функция открытия попапа
    popupElement.classList.add('popup_opened');
};
function closePopup() { //функция закрытия попапа
    popupElement.classList.remove('popup_opened');
};

editButtonProfileElement.addEventListener('click', openPopup);
closeButtonPopupElement.addEventListener('click', closePopup);
saveButtonPopupElement.addEventListener('click', closePopup);

//редактирование профиля

const formElement = document.querySelector('.popup__form'); 
const nameInput = formElement.querySelector('.popup__field_name');
const jobInput = formElement.querySelector('.popup__field_job');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

function handleFormSubmit (evt) { //обработчик формы отправки, пока не работает
    evt.preventDefault(); 
 profileName.textContent = nameInput.value
 profileCaption.textContent = jobInput.value
    CloseEditForm(); 
};
function editName() { //перезаписывает поля в форме
    profileName.textContent = nameInput.value
 profileCaption.textContent = jobInput.value
}
formElement.addEventListener('submit', handleFormSubmit);
saveButtonPopupElement.addEventListener('click', editName); 