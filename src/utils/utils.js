// Variables y constantes
const modalOpenImage = document.querySelector(".modal-image");
const modalImageImage = modalOpenImage.querySelector(".modal-image__image");
const modalImageTitle = modalOpenImage.querySelector(".modal-image__title");
//constantes y variables del modal editar perfil
export const buttonEdit = document.querySelector(".profile__edit-button");
export const formModalEdit = document.querySelector(".modal-edit__form");
const buttonCloseModalEdit = document.querySelector(".modal-edit__button-close");
const modalEdit = document.querySelector(".modal-edit");
const nameInput = document.querySelector(".modal-edit__input-name");
const descriptionInput = document.querySelector(".modal-edit__input-description");
export const buttonSubmitEdit = document.querySelector(".modal-edit__submit");
const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");



//constantes y variables del modal agregar lugar
export const buttonAddPlace = document.querySelector(".profile__button-add");
const modalPlace = document.querySelector(".modal-place");
const formModalPlace = document.querySelector(".modal-place__form");
const buttonCloseModalPlace = document.querySelector(".modal-place__button-close");
const titlePlaceInput = document.querySelector(".modal-place__input-title");
const urlPlaceInput = document.querySelector(".modal-place__input-url");
export const buttonSubmitPlace = document.querySelector(".modal-place__submit");

//constantes y variables del modal abrir y cerrar imagen
const modalImage = document.querySelector(".modal-image");
const buttonCloseModalImage = document.querySelector(".modal-image__button-close");

const cardsContainer = document.querySelector(".cards-container");









//cerrar y abrir modal editar perfil 
function closeModalEdit() {
   modalEdit.classList.remove("modal-open");
   modalEdit.removeEventListener("click", closeModalEdit);
}


 
// abrir modal editar perfil
function openModalEdit() {
   modalEdit.classList.add("modal-open");
   nameInput.value = nameProfile.textContent;
   descriptionInput.value = descriptionProfile.textContent;
}

// guardar cambios del perfil
function saveProfileSubmit(evt) {
   evt.preventDefault();

   nameProfile.textContent = nameInput.value;
   descriptionProfile.textContent = descriptionInput.value;

   closeModalEdit();
}








// modal lugar cerrar y abrir
function closeModalPlace() {
   modalPlace.classList.remove("modal-open");
   modalPlace.removeEventListener("click", closeModalPlace);
}

function openModalPlace() {
   modalPlace.classList.add("modal-open");
   titlePlaceInput.value = ""; // valores escritos en el formulario
   urlPlaceInput.value = "";  // valores escritos en el formulario
}



// modal abrir imagen
function openImage(title, link) {
   

   modalImageTitle.textContent = title;
   modalImageImage.src = link;
   modalImageImage.alt = title;

   modalOpenImage.classList.add("modal-open");
}




// agregar lugar
function addPlace(evt) {
   evt.preventDefault();
   //clonar targeta
   const cardTemplate = document.querySelector("#card-template").content;
   const card = cardTemplate.querySelector(".card").cloneNode(true);

   // tomar valores escritos en el formulario
   const title = titlePlaceInput.value;
   const url = urlPlaceInput.value;

    // seleccionar elementos internos de la tarjeta clonada que quiero cambiar
   let imageCard = card.querySelector(".card__image");
   let titleCard = card.querySelector(".card__title");
   let likeButtonCard = card.querySelector(".card__button-like");
   let deleteButtonCard = card.querySelector(".card__button-delete");

   //actualizo
   titleCard.textContent = title;
   imageCard.src = url;
   imageCard.alt = title;

   likeButtonCard.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__button-like_active");

   });

   //evento eliminar tarjeta
   deleteButtonCard.addEventListener("click", function () {
      card.remove();
   });
   //evento abrir imagen al hacer click en la imagen de la tarjeta

   imageCard.addEventListener("click", () => openImage(title, url));


   //muestro targeta
   cardsContainer.prepend(card);

   closeModalPlace();

   formModalPlace.reset();
};



function closeImage() {
   const modalOpenImage = document.querySelector(".modal-image");
   modalOpenImage.classList.remove("modal-image-open");
}



// cerrar modales con tecla Esc
function handleEsc(evt) {
   if (evt.key === "Escape") {
      closeModalEdit();
      closeImage();
      closeModalPlace();
   }
}

// cerrar modales haciendo click fuera del modal
function handleClickOutside(evt) {
   // Cerrar modal editar
   if (evt.target === modalEdit) {
      closeModalEdit();
   }

   // Cerrar modal agregar lugar
   if (evt.target === modalPlace) {
      closeModalPlace();
   }

   // Cerrar modal imagen
   if (evt.target === modalImage) {
      closeImage();
   }
}




// EventListeners-profile
buttonEdit.addEventListener("click", () => {
   openModalEdit();
});

formModalEdit.addEventListener("submit", saveProfileSubmit);
buttonCloseModalEdit.addEventListener("click", closeModalEdit);
modalEdit.addEventListener("mousedown", handleClickOutside);



//Eventos agregar lugar
buttonAddPlace.addEventListener("click", openModalPlace);
buttonCloseModalPlace.addEventListener("click", closeModalPlace);
formModalPlace.addEventListener("submit", addPlace);
modalPlace.addEventListener("mousedown", handleClickOutside);



//Evento cerrar imagen
buttonCloseModalImage.addEventListener("click", closeImage);
modalImage.addEventListener("mousedown", handleClickOutside);

//cerrar modal con tecla Esc
document.addEventListener("keydown", handleEsc);


//funcion que agrega los event listeners a los inputs
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__input-submit");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};




export { setEventListeners, openImage, openModalPlace, closeModalPlace, closeImage, buttonAddPlace, buttonEdit };




  


    

 