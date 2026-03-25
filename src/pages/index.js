// Importaciones
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithFormPlace } from "../components/PopupWhithFormPlace.js";
import { Api } from "../components/API.js";
import "../components/FormValidation.js";


// solicitud de las tarjetas a la API y renderizado de las mismas en la página
const apiCards = new Api("https://around-api.es.tripleten-services.com/v1/cards/")
const arrayCards = await apiCards.get();

const cardSection = new Section({
  items: arrayCards,
  renderer: item => {
    const card = new Card(item, "#card-template", (name, link) => {      
      imagePopup.openPopup(name, link);
    });

    cardSection.addItem(card.generateCard());
  }
}, ".cards-container");
cardSection.renderItems();



// const cardSectionWithInitialCards = new Section({
//   items: initialCards,
//   renderer: item => {
//     const card = new Card(item, "#card-template", (name, link) => {
      
//       imagePopup.openPopup(name, link);
//     });
//     cardSection.addItem(card.generateCard());
//   }
// }, ".cards-container");

// cardSectionWithInitialCards.renderItems();




const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description"
});



const imagePopup = new PopupWithImage(".modal-image");
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(".modal-edit", data => {
  userInfo.setUserInfo({ name: data.name, job: data.description });
});
profilePopup.setEventListeners();



const addCardPopup = new PopupWithFormPlace(".modal-place", data => {
  const card = new Card({
    name: data.title,
    link: data.url,
  }, "#card-template", (name, link) => {
    imagePopup.openPopup(name, link);
  });

  cardSection.addItem(card.generateCard());
});
addCardPopup.setEventListeners();


const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__button-add");

editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  document.querySelector(".modal-edit__input-name").value = data.name;
  document.querySelector(".modal-edit__input-description").value = data.job;
  
  profilePopup.openPopup();
});



addButton.addEventListener("click", () => {
  addCardPopup.openPopup();
});


//Solicitud de datos del usuario a la API y actualización de la información en la página
const apiDdataUser = new Api("https://around-api.es.tripleten-services.com/v1/users/me");
const dataUser = await apiDdataUser.get();

const nameUser = dataUser.name;
const jobUser = dataUser.about;
const avatarUser = dataUser.avatar;
userInfo.setUserInfo({ name: nameUser, job: jobUser });
userInfo.setUserAvatar(avatarUser);

// solicitud de las tarjetas a la API y renderizado de las mismas en la página
// const apiCards = new Api("https://around-api.es.tripleten-services.com/v1/cards/");
// const arrayCards = await apiCards.postOrPatch();

// arrayCards.forEach(card => {
//   const cardElement = new Card({
//     name: card.name,
//     link: card.link,
//     isLiked: card.isLiked,
//   }, "#card-template", (name, link) => {
//     imagePopup.openPopup(name, link);
//   });
//   cardSection.addItem(cardElement.generateCard());
// });

//solicitu PATCH para actualizar la información del usuario en la API







