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
  cardTemplateSelector
} from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "4b403b24-4f85-4172-998c-15fc38a409ea",
    "Content-Type": "application/json",
  },
});
const getInfo = new UserInfo(selectorUserInfo);

let myId;

Promise.all([ 
  api.getUser(),
  api.getCards()
])
.then((res) => { 
  myId = res[0]._id;
    const userInfo = {
      name_user: res[0].name,
      job_user: res[0].about,
    };
    getInfo.setUserAvatar(res[0].avatar);
    getInfo.setUserInfo(userInfo);

    const initialCards = res[1].reverse();
    instanceСlassSection.renderItems(initialCards);
})
.catch((err)=>{ 
  console.log(err);
}) 

const popupImg = new PopupWithImage(".popup_type_img");

const instanceСlassSection = new Section(renderer, cardsContainer);

//функция для класса Section
function renderer(item) {
  const instanceСlassСard = new Card(item, cardTemplateSelector, popupImg.handleCardClick.bind(popupImg), popupСonsent, myId, сonsentSabmitButton,
  handleDeleteCard, handleLikeCard);
  const newCard = instanceСlassСard.generateCard();
  instanceСlassSection.prependItem(newCard);
}

function handleLikeCard(isLike) {
  if (isLike) {
    return api.deleteLike(this._cardId)
      .then((data) => data)
      .catch((err) => {
        console.log(`Ошибка изменения статуса лайка: ${err}`);
      });
  } else {
    return api.putLike(this._cardId)
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDeleteCard(cardId) {
  return api.deleteCard(cardId)
    .then(() => {
      popupСonsent.close();
    })
    .catch((err) => {
      console.log(err);
    });
}



const popupEditProfile = new PopupWithForm(".popup_type_edit", submitEditFormHandler);
buttonEditProfile.addEventListener("click", () => {
  formEditValidator.resetValidation();
  const dataUser = getInfo.getUserInfo();
  userNameInput.value = dataUser.name;
  userJobInput.value = dataUser.job;
  popupEditProfile.open();
});

const popupAddProfile = new PopupWithForm(".popup_type_add", submitPlaceFormHandler);
buttonAddProfile.addEventListener("click", () => {
  formAddValidator.resetValidation();
  popupAddProfile.open();
});

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", submitEditFormHandlerAvatar);
buttonEditAvator.addEventListener("click", () => {
  formEditAvatarValidator.resetValidation();
  popupEditAvatar.open();
});

const popupСonsent = new PopupWithConfirmation(".popup_type_consent");

const formEditValidator = new FormValidator(settings.formEditSelector, settings);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(settings.formAddSelector, settings);
formAddValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(settings.formEditAvatarSelector, settings);
formEditAvatarValidator.enableValidation();

//сабмиты
function submitEditFormHandler(dataUser) {
  api.editUser(dataUser)
    .then((result) => {
      popupEditProfile.renderLoading(true);
      const dataUser = {
        name_user: result.name,
        job_user: result.about,
      };
      getInfo.setUserInfo(dataUser);
      popupEditProfile.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
}

function submitPlaceFormHandler(dataNewCard) {
  popupAddProfile.renderLoading(true);
  api.createCard(dataNewCard)
    .then((data) => {
      instanceСlassSection.renderItems([data]);
      popupAddProfile.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupAddProfile.renderLoading(false);
    });
}

function submitEditFormHandlerAvatar(dataAvatar) {
  popupEditAvatar.renderLoading(true); 
  api.editAvatar(dataAvatar.avatar_user)
    .then((data) => {
      getInfo.setUserAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}







