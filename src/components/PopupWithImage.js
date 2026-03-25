import { Popup } from "./Popup.js";


export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal-image__image");
    this._titleElement = this._popup.querySelector(".modal-image__title");
  }

  openPopup(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._titleElement.textContent = name;

    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }

  setEventListeners() {
    super.setEventListeners();
  }

}

