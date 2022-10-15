const popupEdit = document.querySelector(".popup_type_edit");
const popupEditButton = document.querySelector(".button_type_edit");
const popupCloseButtonEdit = document.querySelector(".button_type_close");
const popupCloseButtonAdd = document.querySelector(".close-add");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const placeInput = document.querySelector(".popup__input_place");
const linkInput = document.querySelector(".popup__input_link");
const formAddSubmit = document.querySelector(".popup__form-add");
const popupAdd = document.querySelector(".popup_type_add");
const addOpenButton = document.querySelector(".button_type_add");

const popupImg = document.querySelector(".popup_type_img");
const popupCloseImg = document.querySelector(".close-img");
const popupPicture = document.querySelector(".popup__img");
const popupImageCaption = document.querySelector(".popup__img-caption");

const cardsContainer = document.querySelector(".cards__container");
const cardTemplate = document.querySelector(".card-template").content;

//функция создание карточки
function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const imgCard = newCard.querySelector(".cards__image");

  imgCard.src = item.link;
  imgCard.alt = `Изображение ${item.name}`;
  newCard.querySelector(".cards__title").textContent = item.name;

  //увеличение картинки
  newCard.querySelector(".cards__image").addEventListener("click", () => {
    openImgPopup(item);
  });

  //удаление карточки
  newCard
    .querySelector(".button_type_delete")
    .addEventListener("click", (evt) => {
      deleteCard(evt);
    });

  //лайк
  newCard
    .querySelector(".button_type_like")
    .addEventListener("click", (evt) => {
      like(evt);
    });

  return newCard;
}

//добавление начальных карточек на страницу
function renderInitialCards() {
  initialCards.forEach(renderItem);
}

//функция добавление карточки
function renderItem(data) {
  const newCard = createCard(data);
  cardsContainer.prepend(newCard);
}

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupByClickOnOverlay);
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("mousedown", closePopupByClickOnOverlay);
}

//функция закрытия попапа, кликом на Esc
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
};
//функция закрытия попапа, кликом на затемненную область
const closePopupByClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget && evt.which === 1) {
    closePopup(evt.currentTarget);
  }
};

//функция открытия попапа c изображением
function openImgPopup(item) {
  popupPicture.src = item.link;
  popupImageCaption.textContent = item.name;
  popupImageCaption.alt = `Изображение ${item.name}`;
  openPopup(popupImg);
}

//функция удаление карточки
function deleteCard(evt) {
  const cardItem = evt.target.closest(".cards__foto");
  cardItem.remove();
}

//функция лайка
function like(evt) {
  evt.target.classList.toggle("button_active");
}

popupEditButton.addEventListener("click", () => {
  openPopup(popupEdit);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addOpenButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

//закрытие попапов
popupCloseButtonAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

popupCloseButtonEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

popupCloseImg.addEventListener("click", () => {
  closePopup(popupImg);
});

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
  evt.submitter.classList.add("button_type_disabled");
  evt.submitter.setAttribute("disabled", true);
  formAddSubmit.reset(renderItem);
}

formElement.addEventListener("submit", submitEditFormHandler);
formAddSubmit.addEventListener("submit", submitPlaceFormHandler);

renderInitialCards();
