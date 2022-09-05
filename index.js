const popup = document.querySelector(".popup");
const openEditButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".button_close");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

openEditButton.addEventListener("click", () => {
  popup.classList.add("popup_edit-button");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closePopupButton.addEventListener("click", () => {
  popup.classList.remove("popup_edit-button");

});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_edit-button");
}

formElement.addEventListener("submit", formSubmitHandler);

const cards = document.querySelectorAll(".cards");
const buttonsLike = document.querySelectorAll(".cards__like");
console.log(buttonsLike);
buttonsLike.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("cards__like_active");
  });
});
