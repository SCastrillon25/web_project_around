export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".modal__button-close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add("modal-open");
    document.addEventListener("keydown", this._handleEscClose);

  }

  closePopup() {
    this._popup.classList.remove("modal-open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    if(this.closePopup) { 
      this._closeButton.addEventListener("click", () => this.closePopup());
    };
    
    this._popup.addEventListener("mousedown", evt => {
      if (evt.target === this._popup) {
        this.closePopup();
      }
    });

  }

}


