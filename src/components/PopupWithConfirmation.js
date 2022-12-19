import { Popup } from "../components/Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(cardSelector)  {
    super(cardSelector);
    this._popup = document.querySelector(cardSelector);
    
  }

  
}
