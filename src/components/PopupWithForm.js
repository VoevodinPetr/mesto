import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(cardSelector, handleSubmitForm) {
    super(cardSelector);
    this._popup = document.querySelector(cardSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._submitbutton = this._popup.querySelectorAll(".button_type_save");
  }

  close() {
    this._popup.querySelector(".popup__form").reset();
    this._popup.removeEventListener("submit", this.sabmitHandler);
    super.close();
  }

  _getInputValues() {
    this._dataNewCard = {};
    this._inputList.forEach((item) => {
      this._dataNewCard[item.name] = item.value;
    });
    return this._dataNewCard;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitbutton.textContent = "Сохранение...";
    } else {
      this._submitbutton.textContent = "Сохранить";
    }
  }
  _setEventListeners() {
    this.sabmitHandler = () => {
      this._handleSubmitForm(this._getInputValues());
    };
    this._popup.addEventListener("submit", this.sabmitHandler);
    super._setEventListeners();
  }
}
