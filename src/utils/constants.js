export const popupProfileSelector = '.popup_type_edit-profile';
export const popupNewCardSelector = '.popup_type_new-card';
export const popupImageSelector = '.popup_type_image';
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
export const profileAvatarSelector = '.profile__img-avatar'
export const popupImgElement = popupImageContainer.querySelector('.popup__image');
export const popupImageCaptionElement = popupImageContainer.querySelector('.popup__image-caption');

export const configApi = {
    url: 'https://mesto.nomoreparties.co/',
    headers: {
        'Content-Type': 'application/json',
        authorization: '881e0966-bc42-4e12-bb34-8b207989d519'
    }
  };