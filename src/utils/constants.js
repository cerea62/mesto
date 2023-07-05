export const popupProfileSelector = '.popup_type_edit-profile';
export const popupNewCardSelector = '.popup_type_new-card';
export const popupImageSelector = '.popup_type_image';
export const popupConfirmationSelector = '.popup_type_del-card'
export const popupUpdateAvatarSelector = '.popup_type_update-avatar';
export const popupImageContainer = document.querySelector('.popup_type_image'); //модальное окно с изображением
export const profileEditButtonElement = document.querySelector('.profile__edit-button'); //кнопка редактирования
export const newCardAddButtonElement = document.querySelector('.profile__add-button'); //кнопка добавления нового места
export const formEditProfileElement = document.querySelector('.form_type_edit-profile');
export const avatarEditButtonElement = document.querySelector('.profile__edit-avatar');
export const formNewCardElement = document.querySelector('.form_type_new-card');
export const formEditAvatarElement = document.querySelector('.form_type_update-avatar');
export const elementsSelector = '.elements__items';
export const profileNameSelector = '.profile__name';
export const profileCaptionSelector = '.profile__caption';
export const profileAvatarSelector = '.profile__img-avatar';

export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '881e0966-bc42-4e12-bb34-8b207989d519',
        'Content-Type': 'application/json'
    }
}