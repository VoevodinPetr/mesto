import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(cardSelector) {
    super(cardSelector);
    this._increaseImg = this._popup.querySelector(".popup__img");
    this._captionImg = this._popup.querySelector(".popup__img-caption");
  }
  handleCardClick(title, link) {
    this._captionImg.textContent = title;
    this._increaseImg.src = link;
    this._increaseImg.alt = title;
    super.open();
  }
}
