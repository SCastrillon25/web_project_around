import { Popup } from "./Popup.js";
import { Api } from "./API.js";



const avatar = document.querySelector(".profile__image");

export class PopupWithFormPlace extends Popup {
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

  getInputValues() {
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

      const namePlace = document.querySelector(".modal-place__input-title");
      const linkImagePlace = document.querySelector(".modal-place__input-url"); 

      const data = {
        name: namePlace.value,
        link: linkImagePlace.value
      };      
      
      const newDataCard = new Api("https://around-api.es.tripleten-services.com/v1/cards/");
      newDataCard.postOrPatch(data, "POST");

      const inputValues = this.getInputValues();
      this._handleFormSubmit(inputValues);

      this.closePopup();
    });
  };
}