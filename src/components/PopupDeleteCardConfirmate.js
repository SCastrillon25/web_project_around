import { Popup } from "./Popup.js";

export class PopupDeleteCardConfirmate extends Popup {
      constructor(popupSelector, handleDelete) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector(".modal-delete__submit");
        this._handleDelete = handleDelete
    }

    open(cardId, cardElement) {
        super.openPopup(); 

        this._cardId = cardId;
        this._cardElement = cardElement;
    }

    _closePopup() {
        this._popup.classList.remove("modal-open");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
        this.closePopup();
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener("click", () => {
            this._handleDelete(this._cardId)
            .then(() => {
            this._cardElement.remove(); // elimina del DOM
            this.closePopup();          // cierra modal
            })
            .catch(err => console.log(err));
        });
    }
}