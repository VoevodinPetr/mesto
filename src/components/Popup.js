export class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup
        this._popup = document.querySelector(this._selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.__handleСrossAndOverlayClose = this._handleСrossAndOverlayClose.bind(this)
    }
    open() {
        this._popup.classList.add('popup_is-opened');
        this._setEventListeners();
    }

    close() {
        this._popup.removeEventListener("click", this.__handleСrossAndOverlayClose);
        document.removeEventListener('keyup', this._handleEscClose);
        this._popup.classList.remove('popup_is-opened');
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleСrossAndOverlayClose(evt) {
        if (evt.target.classList.contains(this._selectorPopup.substr(1)) || evt.target.classList.contains('button_type_close')) {
            this.close();
        }
    }

    _setEventListeners() {
        this._popup.addEventListener("click", this.__handleСrossAndOverlayClose);
        document.addEventListener("keyup", this._handleEscClose);
    }
}
