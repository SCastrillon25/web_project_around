import { Popup } from "./Popup.js";

class PopupNewAvatar extends Popup {
  constructor(popupSelector, handleNewImage) {
    super(popupSelector);
    this._handleNewImage = handleNewImage;
    this._form = this._popup.querySelector(".form");
    this._input = this._popup.querySelector(".modal-newAvatar__input");
    this._submitButton = this._form.querySelector(".modal-newAvatar__submit")
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
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

      setTimeout(() => {
        this.closePopup();
      },1000)
    });
  }
  
  _setLoading(isLoading) {
    if (!this._submitButton) return;

    if (isLoading) {
      this._defaultText = this._submitButton.textContent;
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._defaultText;
    }
  }
}

export { PopupNewAvatar };