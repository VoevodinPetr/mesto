export class FormValidator {
  constructor(form, settings) {
    this._formSelector = form;
    this._formElement = document.querySelector(form);
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
      if (this._checkFormValidity(this._inputList)) {
        this._disabledButton();
      } else {
        this._buttonElement.removeAttribute("disabled");
        this._buttonElement.classList.remove(this._inactiveButtonClass);
      }
    }
  

  _disabledButton() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _checkFormValidity(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }


  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disabledButton();
      
  });
    this._setEventListeners();
  }
}