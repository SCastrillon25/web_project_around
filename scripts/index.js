// Variables y constantes

// modales editar perfil
const buttonEdit = document.querySelector(".profile__edit-button");
const modalEdit = document.querySelector(".modal-edit");
const formModalEdit = document.querySelector(".modal-edit__form");
const buttonCloseModalEdit = document.querySelector(".modal-edit__button-close");
const nameInput = document.querySelector(".modal-edit__input-name");
const descriptionInput = document.querySelector(".modal-edit__input-description");
const profileSubmitInput = document.querySelector(".modal-edit__submit")
const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");

// modales agregar lugar
const buttonAddPlace = document.querySelector(".profile__button-add");
const modalPlace = document.querySelector(".modal-place");
const formModalPlace = document.querySelector(".modal-place__form");
const buttonCloseModalPlace = document.querySelector(".modal-place__button-close");
const titlePlaceInput = document.querySelector(".modal-place__input-title");
const urlPlaceInput = document.querySelector(".modal-place__input-url");
const buttonSubmitPlace = document.querySelector(".modal-place__submit");

//template card
const cardTemplate = document.querySelector("#card-template").content;
const card = cardTemplate.querySelector(".card").cloneNode(true);
const cardsContainer = document.querySelector(".cards-container");
const likeButtonCard = card.querySelector(".card__button-like");
const cardImage = card.querySelector(".card__imge");
const buttonCloseModalImage = document.querySelector(".modal-image__button-close");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

// Funcione para renderizar las tarjetas a recorriendo el array initialCards forEach
initialCards.forEach(function(item){
   //clonar targeta
   const cardTemplate = document.querySelector("#card-template").content;
   const card = cardTemplate.querySelector(".card").cloneNode(true);
   // seleccionar elementos internos de la tarjeta clonada
   const cardName = card.querySelector(".card__title");
   const cardImage = card.querySelector(".card__imge");
   const likeButtonCard = card.querySelector(".card__button-like");

   //actualizo
   cardImage.alt = item.name;
   cardImage.src = item.link;
   cardName.textContent = item.name;

   //evento like
   likeButtonCard.addEventListener("click", function (evt) {
   evt.target.classList.toggle("card__button-like_active");
});

   //evento abrir imagen
   cardImage.addEventListener("click", function () {
      const modalOpenImage = document.querySelector(".modal-image");
      const modalImageImg = document.querySelector(".modal-image__img");
      const modalImageTitle = document.querySelector(".modal-image__title");
      modalImageTitle.textContent = item.name;
      modalImageImg.src = item.link;
      modalImageImg.alt = item.name;
      modalOpenImage.classList.add("modal-image-open");
   });
   //inserto targeta al inicio del contenedor
   cardsContainer.prepend(card);
});




// modal cerrar y abrir
function closeModalEdit() {
   modalEdit.classList.remove("modal-edit-open");
   modalEdit.removeEventListener("clik", closeModalEdit);
}

function openModalEdit() {
   modalEdit.classList.add("modal-edit-open");
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
   modalPlace.classList.remove("modal-place-open");
   modalPlace.target.removeEventListener("click", closeModalPlace);
}

function openModalPlace() {
   modalPlace.classList.add("modal-place-open");
   titlePlaceInput.value = ""; // valores escritos en el formulario
   urlPlaceInput.value = "";  // valores escritos en el formulario
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
   let titleCard = card.querySelector(".card__title");
   let imgeCard = card.querySelector(".card__imge");
   let likeButtonCard = card.querySelector(".card__button-like");

   //actualizo
   titleCard.textContent = title;
   imgeCard.src = url;
   imgeCard.alt = title;

   likeButtonCard.addEventListener("click", function (evt) {
      likeButtonCard.classList.toggle("card__button-like");
      evt.target.classList.toggle("card__button-like_active");

   });

   //modal abrir imagen
   function openModalImage() {
   const modalOpenImage = document.querySelector(".modal-image");
   const modalImageImg = document.querySelector(".modal-image__img");
   const modalImageTitle = document.querySelector(".modal-image__title");
   modalImageTitle.textContent = title;
   modalImageImg.src = url;
   modalImageImg.alt = title;
   modalOpenImage.classList.add("modal-image-open");

   }

   imgeCard.addEventListener("click", openModalImage);


   //muestro targeta|
   cardsContainer.prepend(card);

   closeModalPlace();

   formModalPlace.reset();
};

// modal cerrar imagen
function closeModalImage() {
   const modalOpenImage = document.querySelector(".modal-image");
   modalOpenImage.classList.remove("modal-image-open");
   buttonCloseModalImage.target.removeEventListener("click", closeModalImage);
}

// EventListeners
buttonEdit.addEventListener("click", openModalEdit);
formModalEdit.addEventListener("submit", saveProfileSubmit);
buttonCloseModalEdit.addEventListener("click", closeModalEdit);

buttonAddPlace.addEventListener("click", openModalPlace);
buttonCloseModalPlace.addEventListener("click", closeModalPlace);
formModalPlace.addEventListener("submit", addPlace);


//modal cerrar imagen
buttonCloseModalImage.addEventListener("click", closeModalImage);





