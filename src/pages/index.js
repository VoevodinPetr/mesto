import "./index.css";
import {
  settings,
  selectorUserInfo,
  cardsContainer,
  userNameInput,
  userJobInput,
  buttonAddProfile,
  buttonEditProfile,
  buttonEditAvator,
  сonsentSabmitButton,
} from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "4b403b24-4f85-4172-998c-15fc38a409ea",
    "Content-Type": "application/json",
  },
});

const popupImg = new PopupWithImage(".popup_type_img");

const instanceСlassSection = new Section(renderer, cardsContainer);

//функция для класса Section
function renderer(item) {
  const instanceСlassСard = new Card(item, ".card-template", popupImg.handleCardClick.bind(popupImg), popupСonsent, myId, сonsentSabmitButton,
    apiDeleteCard, apiLike);
  const newCard = instanceСlassСard.generateCard();
  instanceСlassSection.prependItem(newCard);
}

function apiLike(isLike) {
  if (isLike) {
    return api.deleteLike(this._cardId)
      .then((data) => data)
      .catch((err) => {
        alert(err);
      });
  } else {
    return api.putLike(this._cardId)
      .then((data) => data)
      .catch((err) => {
        alert(err);
      });
  }
}

function apiDeleteCard(cardId) {
  return api.deleteCard(cardId)
    .then(() => {
      popupСonsent.close();
    })
    .catch((err) => {
      alert(err);
    });
}

//рендер начальных карточек
api.getCards()
  .then((result) => {
    const initialCards = result.reverse();
    instanceСlassSection.renderItems(initialCards);
  })
  .catch((err) => {
    alert(err);
  });

const getInfo = new UserInfo(selectorUserInfo);

let myId;

//первоночальная отрисовка данных пользователя
api.getUser()
  .then((result) => {
    myId = result._id;
    const userInfo = {
      name_user: result.name,
      job_user: result.about,
    };
    getInfo.setUserAvatar(result.avatar);
    getInfo.setUserInfo(userInfo);
  })
  .catch((err) => {
    alert(err);
  });

const popupEditProfile = new PopupWithForm(".popup_type_edit", submitEditFormHandler);
buttonEditProfile.addEventListener("click", () => {
  formEditValidator._resetValidation();
  const dataUser = getInfo.getUserInfo();
  userNameInput.value = dataUser.name;
  userJobInput.value = dataUser.job;
  popupEditProfile.open();
});

const popupAddProfile = new PopupWithForm(".popup_type_add", submitPlaceFormHandler);
buttonAddProfile.addEventListener("click", () => {
  formAddValidator._resetValidation();
  popupAddProfile.open();
});

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", submitEditFormHandlerAvatar);
buttonEditAvator.addEventListener("click", () => {
  formEditAvatarValidator._resetValidation();
  popupEditAvatar.open();
});

const popupСonsent = new Popup(".popup_type_сonsent");

const formEditValidator = new FormValidator(settings.formEditSelector, settings);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(settings.formAddSelector, settings);
formAddValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(settings.formEditAvatarSelector, settings);
formEditAvatarValidator.enableValidation();

//сабмиты
function submitEditFormHandler(evt, dataUser) {
  renderLoading(true, evt);
  api.editUser(dataUser)
    .then((result) => {
      const dataUser = {
        name_user: result.name,
        job_user: result.about,
        avatar_user: result.avatar,
      };
      getInfo.setUserInfo(dataUser);
      popupEditProfile.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}

function submitPlaceFormHandler(evt, dataNewCard) {
  renderLoading(true, evt);
  api.createCard(dataNewCard)
    .then((data) => {
      instanceСlassSection.renderItems([data]);
      popupAddProfile.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}

function submitEditFormHandlerAvatar(evt, DataAvatar) {
  renderLoading(true, evt);
  api.editAvatar(DataAvatar.avatar_user)
    .then((data) => {
      getInfo.setUserAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
}

function renderLoading(isLoading, evt) {
  const buttonSabmit = evt.target.querySelector(".button_type_save");
  if (isLoading) {
    buttonSabmit.textContent = `${buttonSabmit.textContent}...`;
  } else {
    buttonSabmit.textContent = buttonSabmit.textContent.slice(0, -3);
  }
}
