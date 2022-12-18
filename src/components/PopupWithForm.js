import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  constructor(cardSelector, handleSubmitForm) {
    super(cardSelector);
    this._popup = document.querySelector(cardSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitbutton = this._popup.querySelector(".button_type_save");
  }

  close() {
    this._popup.querySelector(".popup__form").reset();
    super.close();
  }

  _getInputValues() {
    this._dataNewCard = {};
    this._inputList.forEach((item) => {
      this._dataNewCard[item.name] = item.value;
    });
    return this._dataNewCard;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener('submit', () => {
      this.renderLoading(true);
      this._handleSubmitForm(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitbutton.textContent = 'Сохранение...';
    } else {
      this._submitbutton.textContent = this._submitbutton.dataset.value;
    }
  }
}
