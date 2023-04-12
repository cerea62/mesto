// открытие и закрытие окна попапа
let popup = document.querySelector('.popup'); //окно попапа
let editButton = document.querySelector('.profile__edit-button'); //кнопка редактирования
let closeButton = document.querySelector('.popup__close'); //кнопка закрытия
let saveButton = document.querySelector('.popup__save');

function openPopup() { //функция открытия попапа
    popup.classList.add('popup_opened');
};
function closePopup() { //функция закрытия попапа
    popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', closePopup);

//редактирование профиля

let formElement = document.querySelector('.popup__form'); 
let nameInput = formElement.querySelector('.popup__field_name');
let jobInput = formElement.querySelector('.popup__field_job');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');

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
saveButton.addEventListener('click', editName); 