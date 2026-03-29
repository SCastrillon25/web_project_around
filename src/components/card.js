import { Api } from "./API.js";


export class Card {
  constructor(data, templateSelector, handleOpenImage, confirmatePopup, api) {
    this._title = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleOpenImage;
    this._confirmatePopup = confirmatePopup;
    this._id = data._id;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._isLiked = !this._isLiked;
      this._likeButton.classList.toggle("card__button-like_active");
      
      const isLikedCard = new Api(`https://around-api.es.tripleten-services.com/v1/`);
      isLikedCard.likeCard(this._id, this._isLiked);
    });
    

    this._deleteButton.addEventListener("click", () => {
      this._confirmatePopup.open(this._id, this._element);
    });

    this._imageElement.addEventListener("click", () => {
      this._handleOpenImage(this._title, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__image");
    this._titleElement = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__button-like");
    this._deleteButton = this._element.querySelector(".card__button-delete");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;

    this._setEventListeners();

    if (this._isLiked) {
      this._likeButton.classList.add("card__button-like_active");
    }

    return this._element;
  }
}
