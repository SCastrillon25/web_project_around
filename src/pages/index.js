// Importaciones
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "../components/FormValidation.js";

const cardSection = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card(item, "#card-template", (name, link) => {
      
      imagePopup.openPopup(name, link);
    });
    cardSection.addItem(card.generateCard());
  }
}, ".cards-container");

cardSection.renderItems();




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



const addCardPopup = new PopupWithForm(".modal-place", data => {
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


