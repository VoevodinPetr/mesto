export class Card {
  constructor(data, cardSelector, openImgPopup, popupСonsent, myId, сonsentSabmitButton, apiDeleteCard, apiLike) {
    this._cardSelector = cardSelector;
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._openImgPopup = openImgPopup;
    this._like = data.likes.length;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._cardId = data._id;
    this._popupСonsent = popupСonsent;
    this._сonsentSabmitButton = сonsentSabmitButton;
    this._apiDeleteCard = apiDeleteCard;
    this._apiLike = apiLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__foto")
      .cloneNode(true);
    return cardElement;
  }

  _installLike(data) {
    this._likeNumber.textContent = data.likes.length;
    if (this._updateLike(data)) {
      this._element
        .querySelector(".button_type_like")
        .classList.add("button_active");
    } else {
      this._element
        .querySelector(".button_type_like")
        .classList.remove("button_active");
    }
  }

  _handleLike() {
    this._apiLike(this._updateLike(this._data)).then((data) => {
      this._data.likes = data.likes;
      this._installLike(data);
    });
  }

  _updateLike(data) {
    this._chekLike = false;
    data.likes.forEach((el) => {
      if (el._id === this._myId) {
        this._chekLike = true;
      }
    });
    return this._chekLike;
  }

  _sabmitDeleteCard() {
    this._deleteCardWrapper = () => {
      this._deleteCard();
    };
    this._сonsentSabmitButton.addEventListener(
      "click", this._deleteCardWrapper
    );
  }

  _deleteCard() {
    this._apiDeleteCard(this._cardId).then(() => {
      this._element.remove();
      this._сonsentSabmitButton.removeEventListener(
        "click", this._deleteCardWrapper
      );
    });
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._openImgPopup(this._title, this._image);
      });

    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", () => {
        this._handleLike();
      });

    if (this._myId === this._ownerId) {
      this._buttonDelete = this._element.querySelector(".button_type_delete");
      this._buttonDelete.addEventListener("click", (evt) => {
        this._popupСonsent.open();
        this._sabmitDeleteCard();
      });
      this._buttonDelete.classList.add("button_visible");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__image");
    this._element.querySelector(".cards__title").textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Изображение места ${this._title}`;
    this._likeNumber = this._element.querySelector(".cards__like-number");
    this._installLike(this._data);
    this._setEventListeners();

    return this._element;
  }
}
