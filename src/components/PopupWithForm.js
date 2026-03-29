import { Popup } from "./Popup.js";
import { Api } from "./API.js";



const avatar = document.querySelector(".profile__image");

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

      const nameData = document.querySelector(".modal-edit__input-name");
      const descriptionData = document.querySelector(".modal-edit__input-description"); 

      const data = {
        name: nameData.value,
        about: descriptionData.value
      };      
      
      const newDataUser = new Api("https://around-api.es.tripleten-services.com/v1/users/me");
      newDataUser.postOrPatch(data, "PATCH");

      const inputValues = this.getInputValues();
      this._handleFormSubmit(inputValues);

      this.closePopup();
    });
  };
}



