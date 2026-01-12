import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");           
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.closePopup();
    });
  }
}


