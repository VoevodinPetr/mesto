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

//рендер начальных карточек
const defaultCardList = new Section(
  { items: initialCards, renderer: rendererAppend },
  cardsContainer
);
defaultCardList.renderItems();

const getInfo = new UserInfo(selectorUserInfo);

const popupEdit = new PopupWithForm(".popup_type_edit", submitEditFormHandler);
document.querySelector(".button_type_edit").addEventListener("click", () => {
  const dataUser = getInfo.getUserInfo();
  userNameInput.value = dataUser.name;
  userJobInput.value = dataUser.job;
  popupEdit.open();
});

const popupAdd = new PopupWithForm(".popup_type_add", submitPlaceFormHandler);
document.querySelector(".button_type_add").addEventListener("click", () => {
  popupAdd.open();
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
  const cardElement = rendererCard(item);
  defaultCardList.appendItem(cardElement);
}

function rendererPrepend(item) {
  const cardElement = rendererCard(item);
  defaultCardList.addItem(cardElement);
}

function rendererCard(item) {
  const card = new Card(
    item,
    ".card-template",
    popupImg.handleCardClick.bind(popupImg)
  );
  return card.generateCard();
}

//сабмиты
function submitEditFormHandler(dataUser) {
  getInfo.setUserInfo(dataUser);
  popupEdit.close();
}

function submitPlaceFormHandler(dataNewCard) {
  popupAdd.close();
  const newCard = new Section(
    { items: [dataNewCard], renderer: rendererPrepend },
    ".cards__container"
  );
  newCard.renderItems();
}
