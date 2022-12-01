import "./index.css";
import {
  initialCards,
  settings,
  selectorUserInfo,
  cardsContainer,
  userNameInput,
  userJobInput,
  buttonAddProfile,
  buttonEditProfile
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const popupImg = new PopupWithImage(".popup_type_img");

const defaultCardList = new Section({ items: initialCards, renderer: rendererAppend }, cardsContainer);
defaultCardList.renderItems();

const userInfo = new UserInfo(selectorUserInfo);

const popupEditProfile = new PopupWithForm(".popup_type_edit", submitEditFormHandler);
buttonEditProfile.addEventListener("click", () => {
  formEditValidator._resetValidation()
  const dataUser = userInfo.getUserInfo();
  userNameInput.value = dataUser.name;
  userJobInput.value = dataUser.job;
  popupEditProfile.open();
});

const popupAddProfile = new PopupWithForm(".popup_type_add", submitPlaceFormHandler);
buttonAddProfile.addEventListener("click", () => {
  formAddValidator._resetValidation()
  popupAddProfile.open();
});

const formEditValidator = new FormValidator(settings.formEditSelector,settings);
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
  rendererPrepend(dataNewCard);
}
