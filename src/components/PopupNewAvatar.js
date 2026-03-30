import { Popup } from "./Popup.js";

class PopupNewAvatar extends Popup {
  constructor(popupSelector, handleNewImage) {
    super(popupSelector);
    this._handleNewImage = handleNewImage;
    this._form = this._popup.querySelector(".form");
    this._input = this._popup.querySelector(".modal-newAvatar__input");
  }

  getInputValue() {
    return {
      avatar: this._input.value
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const avatarLink = this.getInputValue();

      this._handleNewImage(avatarLink);

      this.closePopup();
    });
  }
}

export { PopupNewAvatar };