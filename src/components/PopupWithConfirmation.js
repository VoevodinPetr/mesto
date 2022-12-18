import { Popup } from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(cardSelector, handleSubmitForm) {
    super(cardSelector);
    this._popup = document.querySelector(cardSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._handleSubmitForm();
    });
  }
}
