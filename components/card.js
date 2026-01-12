export class Card {
  constructor(data, templateSelector, handleOpenImage) {
    this._title = data.name;
    this._link = data.link;
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
      this._likeButton.classList.toggle("card__button-like_active");
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

    return this._element;
  }
}
