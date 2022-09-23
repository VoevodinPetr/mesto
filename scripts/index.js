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
const popupForm = document.querySelector(".popup_type_edit");
const openEditButton = document.querySelector(".button_type_edit");
const closePopupButton = document.querySelector(".button_type_close");
const closePopupAdd = document.querySelector(".close-add");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const placeInput = document.querySelector(".popup__input_place");
const linkInput = document.querySelector(".popup__input_link");
const formAddSubmit = document.querySelector(".popup__form-add");
const popupAdd = document.querySelector(".popup_type_add");
const openAddButton = document.querySelector(".button_type_add");
const openPopupImg = document.querySelector(".popup_type_img");
const closePopupImg = document.querySelector(".close-img");
const cardsContainer = document.querySelector(".cards__container");
const cardTemplate = document.querySelector(".card-template").content;

openEditButton.addEventListener("click", () => {
  popupForm.classList.add("popup_is-opened");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closePopupButton.addEventListener("click", () => {
  popupForm.classList.remove("popup_is-opened");
});

//добаление карточки
openAddButton.addEventListener("click", () => {
  popupAdd.classList.add("popup_is-opened");
});

closePopupAdd.addEventListener("click", () => {
  popupAdd.classList.remove("popup_is-opened");
});

function createCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  const imgCard = newCard.querySelector(".cards__image");

  imgCard.src = link;
  imgCard.alt = `Изображение ${name}`;
  newCard.querySelector(".cards__title").textContent = name;

  //увеличение картинки
  imgCard.addEventListener("click", () => {
    openPopupImg.classList.add("popup_is-opened");

    const popupPicture = document.querySelector(".popup__img");
    const popupImageCaption = document.querySelector(".popup__img-caption");
    popupPicture.src = link;
    popupImageCaption.textContent = name;
  });

  closePopupImg.addEventListener("click", () => {
    openPopupImg.classList.remove("popup_is-opened");
  });

  //мусорка
  newCard
    .querySelector(".button_type_delete")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  //лайк
  newCard
    .querySelector(".button_type_like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("button_active");
    });

  return newCard;
}

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

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupForm.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", formSubmitHandler);

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  addCard();
  placeInput.value = "";
  linkInput.value = "";

  popupAdd.classList.remove("popup_is-opened");
}
formAddSubmit.addEventListener("submit", formSubmitHandlerPlace);
