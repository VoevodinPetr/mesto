import "./index.css";
import {
  initialCards,
  settings,
  selectorUserInfo,
  cardsContainer,
  userNameInput,
  userJobInput,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const popupImg = new PopupWithImage(".popup_type_img");
const buttonAddProfile = document.querySelector(".button_type_add");
const buttonEditProfile = document.querySelector(".button_type_edit");
//рендер начальных карточек
const defaultCardList = new Section(
  { items: initialCards, renderer: rendererAppend },
  cardsContainer
);
defaultCardList.renderItems();

const userInfo = new UserInfo(selectorUserInfo);

const popupEditProfile = new PopupWithForm(".popup_type_edit", submitEditFormHandler);
buttonEditProfile.addEventListener("click", () => {
  formEditValidator.hideInputError(document.querySelector("#popup__input_name"));
  formEditValidator.hideInputError(document.querySelector("#popup__input_job"));
  formEditValidator.enabledButton();
  const dataUser = userInfo.getUserInfo();
  userNameInput.value = dataUser.name;
  userJobInput.value = dataUser.job;
  popupEditProfile.open();
});

const popupAddProfile = new PopupWithForm(".popup_type_add", submitPlaceFormHandler);
buttonAddProfile.addEventListener("click", () => {
  document.querySelector(".popup_type_add").querySelector(".popup__form").reset();
  formAddValidator.hideInputError(document.querySelector("#popup__input_card-name"));
  formAddValidator.hideInputError(document.querySelector("#popup__input_link"));
  formAddValidator.disabledButton();
  popupAddProfile.open();
});

//валидация форм
const formEditValidator = new FormValidator(
  settings.formEditSelector,
  settings
);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(settings.formAddSelector, settings);
formAddValidator.enableValidation();

function rendererAppend(item) {
  const cardElement = createCard(item);
  defaultCardList.appendItem(cardElement);
}

function rendererPrepend(item) {
  const cardElement = createCard(item);
  defaultCardList.prependItem(cardElement);
}

function createCard(item) {
  const card = new Card(
    item,".card-template", popupImg.handleCardClick.bind(popupImg));
  return card.generateCard();
}

function submitEditFormHandler(dataUser) {
  userInfo.setUserInfo(dataUser);
  popupEditProfile.close();
}

function submitPlaceFormHandler(dataNewCard) {
  popupAddProfile.close();
  const newCard = new Section(
    { items: [dataNewCard], renderer: rendererPrepend },
    cardsContainer
  );
  newCard.renderItems();
}
