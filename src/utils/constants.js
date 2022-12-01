export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];
  
  export const settings = {
    formSelector: ".popup__form",
    formEditSelector: ".popup__form-edit",
    formAddSelector: ".popup__form-add",
    inputSelector: ".popup__input",
    submitButtonSelector: ".button",
    inactiveButtonClass: "button_type_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_visible",
  };

  export const selectorUserInfo = {
    nameSelector: '.profile__name',
    jobSelector: '.profile__job',
};

export const cardsContainer = document.querySelector(".cards__container");
export const userNameInput = document.querySelector(".popup__input_name");
export const userJobInput = document.querySelector(".popup__input_job");
export const buttonAddProfile = document.querySelector(".button_type_add");
export const buttonEditProfile = document.querySelector(".button_type_edit");