import "./styles/pages/index.css";

import { showImagePopup, openEditProfilePopup, openNewCardPopup} from "./components/modal";
import { createCard } from "./components/card";
import { initialCards } from "./data/cards";
import { hundleFormSubmit as hundleProfileFormSubmit } from "./components/forms/profile-edit";
import { handleCreateForm } from "./components/forms/create-card";

// DOM узлы
const placesList = document.querySelector(".places__list"); // Контейнер для карточек
const editProfileButton = document.getElementById('editProfileButton'); // кнопка для редактирования профиля
const newCardButton = document.getElementById('newCardButton'); // кнопка для создания карточки
const newCardForm = document.getElementById('newCardForm'); // форма создания карточки
const editProfileForm = document.getElementById('editProfileForm'); // форма редактирования профиля

// Выводим карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, showImagePopup);
  placesList.append(cardElement);
});


// Открытие модального окна по клику на кнопку создания карточки
newCardButton.addEventListener('click', () => openNewCardPopup(
  newCardForm
  ));

// Открытие модального окна по клику на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => openEditProfilePopup(editProfileForm));

// Обработка отправки формы создания карточки
newCardForm.addEventListener('submit', (event) => handleCreateForm(
  event, newCardForm, createCard, placesList, showImagePopup
));

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (e) => {
  hundleProfileFormSubmit(e, editProfileForm); 
});

// Добавляем анимацию на все модальные окна
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.classList.add('popup_is-animated')
})