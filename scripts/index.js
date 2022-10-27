import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
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

//параметры для валидации
const settings = {
  formSelector: ".popup__form",
  formEditSelector: ".popup__form-edit",
  formAddSelector: ".popup__form-add",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button",
  inactiveButtonClass: "button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const popupEdit = document.querySelector(".popup_type_edit");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const placeInput = document.querySelector(".popup__input_place");
const linkInput = document.querySelector(".popup__input_link");
const formAddSubmit = document.querySelector(".popup__form-add");
const popupAdd = document.querySelector(".popup_type_add");

const popupImg = document.querySelector(".popup_type_img");
const picture = document.querySelector(".popup__img");
const imageCaption = document.querySelector(".popup__img-caption");

const cardsContainer = document.querySelector(".cards__container");

//добавление начальных карточек на страницу
function renderInitialCards() {
  initialCards.forEach(renderItem);
  setListeners();
}

//функция добавление карточки
function renderItem(item) {
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//функция закрытия попапа, кликом на Esc
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};

//открытия попапа c изображением
export function openImgPopup(title, link) {
  picture.src = link;
  imageCaption.textContent = title;
  openPopup(popupImg);
}

//обработчик событий
function setListeners() {
  document
    .querySelector(".button_type_edit")
    .addEventListener("click", openEditPopup);

  document
    .querySelector(".button_type_add")
    .addEventListener("click", openAddPopup);

//закрытие попапов кликом на крестик и оверлей
    popupEdit.addEventListener("click", (evt) => {
      if (evt.target.classList.contains('popup_type_edit') || evt.target.classList.contains('button_type_close')) {
    closePopup(popupEdit);
      }
  });

  popupAdd.addEventListener("click", (evt) => {
    if (evt.target.classList.contains('popup_type_add') || evt.target.classList.contains('button_type_close')) {
    closePopup(popupAdd);
    }
  });

  popupImg.addEventListener("click", (evt) => {
    if (evt.target.classList.contains('popup_type_img') || evt.target.classList.contains('button_type_close')) {
    closePopup(popupImg);
    }
  });

  //отправка форм
  formElement.addEventListener("submit", submitEditFormHandler);
  formAddSubmit.addEventListener("submit", submitPlaceFormHandler);
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}

//открытия попапа добавления карточек
function openAddPopup() {
  formAddSubmit.reset();
  openPopup(popupAdd);
}


// Редактирование имени и вида деятельности
function submitEditFormHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// добавление новой карточки
function submitPlaceFormHandler(evt) {
  evt.preventDefault();
  renderItem({
    name: placeInput.value,
    link: linkInput.value,
  });
  closePopup(popupAdd);
}

renderInitialCards();

const formEditValidator = new FormValidator(
  settings.formEditSelector,
  settings,
  openImgPopup
);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(
  settings.formAddSelector,
  settings,
  openImgPopup
);
formAddValidator.enableValidation();
