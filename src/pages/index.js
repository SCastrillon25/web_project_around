// Importaciones
import { Card } from "../components/card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithFormPlace } from "../components/PopupWithFormPlace.js";
import { PopupDeleteCardConfirmate } from "../components/PopupDeleteCardConfirmate.js";
import { Api } from "../components/Api.js";
import "../components/FormValidation.js";
import { PopupNewAvatar } from "../components/PopupNewAvatar.js";

const inputNewAvatar = document.querySelector(".modal-newAvatar__input");


const api = new Api("https://around-api.es.tripleten-services.com/v1");

const cardsReverse = await api.getCards();
const cards = cardsReverse.reverse();

const confirmatePopup = new PopupDeleteCardConfirmate(
  ".modal-delete-card",
  (cardId) => api.cardDelete(cardId)  
);
confirmatePopup.setEventListeners();

const imagePopup = new PopupWithImage(".modal-image");
imagePopup.setEventListeners();


const cardSection = new Section({
  items: cards,
  renderer: item => {
    const card = new Card(
      item,
      "#card-template", 
      (name, link) => {      
      imagePopup.openPopup(name, link);
    }, confirmatePopup, api);

    cardSection.addItem(card.generateCard());
  }
}, ".cards-container");
cardSection.renderItems();


const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description"
});


//Solicitud de datos del usuario a la API y actualización de la información en la página
const dataUser = await api.getDataUser();

const nameUser = dataUser.name;
const jobUser = dataUser.about;
const avatarUser = dataUser.avatar;
userInfo.setUserInfo({ name: nameUser, job: jobUser });
userInfo.setUserAvatar(avatarUser);


const profilePopup = new PopupWithForm(".modal-edit", data => {
  profilePopup._setLoading(true); // 🔥 activa "Guardando..."

  api.postOrPatch({
    name: data.name,
    about: data.description
  }, "PATCH")
  .then(res => {
    userInfo.setUserInfo({
      name: res.name,
      job: res.about
    });
    setTimeout(() => {
      profilePopup.closePopup()
    },1000)
    
  })
  .catch(err => console.log(err))
  .finally(() => {
    profilePopup._setLoading(false); // 🔥 vuelve a "Guardar"
  })
});
profilePopup.setEventListeners();





const addCardPopup = new PopupWithFormPlace(".modal-place", data => {
  const button = document.querySelector(".modal-place__submit");
  button.disabled = true;
  api.createCard({
    name: data.title,
    link: data.url,
    _id: data._id
  })  
  .then(res => {
    const card = new Card(
      res,
      "#card-template", 
      (name, link) => {
        imagePopup.openPopup(name, link);
      }, 
      confirmatePopup, 
      api
    );
    cardSection.addItem(card.generateCard());
  })
  .catch(err => console.log(err))
  .finally(() => {
    button.disabled = false;
  });
});
addCardPopup.setEventListeners();





// const newLink = inputNewAvatar.value;
const avatarPopup = new PopupNewAvatar(".modal-newAvatar", (newLink) => {
    avatarPopup._setLoading(true);

    api.newAvatar(newLink)
    .then(res => {
        userInfo.setUserAvatar(res.avatar);
        setTimeout(() => {
          avatarPopup.closePopup()
        },1000)
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup._setLoading(false); // 🔥 vuelve a "Guardar"
    })
});
avatarPopup.setEventListeners();

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

const avatarImage = document.querySelector(".profile__container-image");
avatarImage.addEventListener("mouseover", () => {
 const hoverAvatar = document.querySelector(".profile__container-image__hover");
 hoverAvatar.classList.remove("profile__container-image__hover-active");
});

avatarImage.addEventListener("mouseout", () => {
 const hoverAvatar = document.querySelector(".profile__container-image__hover");
 hoverAvatar.classList.add("profile__container-image__hover-active");
});



const avatarButton = document.querySelector(".profile__container-image_hover-button");
avatarButton.addEventListener("click", () => {
  avatarPopup.openPopup();
});



