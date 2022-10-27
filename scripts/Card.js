import { openImgPopup } from "./index.js";

export class Card {
    constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._title = data.name;
    this._image = data.link;
    this._openImgPopup = openImgPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__foto").cloneNode(true);
    return cardElement;
  }

  _handleLike(evt) {
    evt.target.classList.toggle("button_active");
  }

  _handleDeleteCard(evt) {
    evt.target.parentNode.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        openImgPopup(this._title, this._image);
      });

    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", this._handleLike);
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._handleDeleteCard);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".cards__image");
    this._element.querySelector(".cards__title").textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Изображение места ${this._title}`;
    return this._element;
  }
}
