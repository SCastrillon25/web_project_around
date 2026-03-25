import { Api } from "./API.js";

export class Card {
  constructor(data, templateSelector, handleOpenImage) {
    this._title = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleOpenImage;
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
      if (this._isLiked) {
        this._likeButton.classList.add("card__button-like_active");
      } else {
        this._likeButton.classList.remove("card__button-like_active");
      }

      // const data = {
      //   isLiked: this._isLiked
      // };
      
      // const Card = new Api(`https://around-api.es.tripleten-services.com/v1/`);
      // const idCard = Card.getId();


      // const apiIsLiked = new Api( `https://around-api.es.tripleten-services.com/v1/cards/`);
      // apiIsLiked.cardIsLiked(this._id, data);

    });
    

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
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
