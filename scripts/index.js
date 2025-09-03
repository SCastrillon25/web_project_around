const buttonEdit = document.querySelector(".profile__edit-button");
const modalEdit = document.querySelector(".modal-edit");
const formModalEdit = document.querySelector(".modal-edit__form");


const buttonCloseModalEdit = document.querySelector(".modal-edit__button-close");
const nameInput = document.querySelector(".modal-edit__input-name");
const descriptionInput = document.querySelector(".modal-edit__input-description");
const submitInput = document.querySelector(".modal-edit__submit")
const nameProfile = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__description");


function closeModal() {
   modalEdit.classList.remove("modal-edit-open");
}

function saveProfileSubmit(evt) {
   evt.preventDefault();

   nameProfile.textContent = nameInput.value;
   descriptionProfile.textContent = descriptionInput.value;

   closeModal();
}

function openModal() {
   modalEdit.classList.add("modal-edit-open");
   nameInput.value = nameProfile.textContent;
   descriptionInput.value = descriptionProfile.textContent;
}

buttonEdit.addEventListener("click", openModal);
formModalEdit.addEventListener("submit", saveProfileSubmit);
buttonCloseModalEdit.addEventListener("click", closeModal);


