const popupForm = document.querySelector(".popup_type_edit");
const popupEditButton = document.querySelector(".button_type_edit");
const popupCloseButton = document.querySelector(".button_type_close");
const popupCloseAdd = document.querySelector(".close-add");
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
const cardsContainer = document.querySelector(".cards__container");
const cardTemplate = document.querySelector(".card-template").content;

function createCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  const imgCard = newCard.querySelector(".cards__image");

  imgCard.src = link;
  imgCard.alt = `Изображение ${name}`;
  newCard.querySelector(".cards__title").textContent = name;

  //увеличение картинки
  imgCard.addEventListener("click", () => {
    popupImg.classList.add("popup_image-opened");

    const popupPicture = document.querySelector(".popup__img");
    const popupImageCaption = document.querySelector(".popup__img-caption");
    popupPicture.src = link;
    popupImageCaption.textContent = name;
    popupImageCaption.alt = `Изображение ${name}`;
  });

  //мусорка
  newCard
    .querySelector(".button_type_delete")
    .addEventListener("click", (evt) => {
      const cardItem = evt.target.closest(".cards__foto");
      cardItem.remove();
    });
  //лайк
  newCard
    .querySelector(".button_type_like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("button_active");
    });

  return newCard;
}

popupCloseImg.addEventListener("click", () => {
  popupImg.classList.remove("popup_image-opened");
});

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

//заполнение формы
popupEditButton.addEventListener("click", () => {
  openPopup(popupForm);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupCloseButton.addEventListener("click", () => {
  closePopup(popupForm);
});

//добаление карточки
addOpenButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

popupCloseAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  cardsContainer.prepend(newCard);
});

const addCard = () => {
  const newCardData = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardsContainer.prepend(createCard(newCardData));
};

function submitFormHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForm);
}
formElement.addEventListener("submit", submitFormHandler);

function submitFormHandlerPlace(evt) {
  evt.preventDefault();
  addCard();
  document.getElementById("addCard").reset();
  closePopup(popupAdd);
}
formAddSubmit.addEventListener("submit", submitFormHandlerPlace);
