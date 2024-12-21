import "./styles/pages/index.css";

require('./scripts/popups/popups.js')
import { showImagePopup } from "./scripts/popups/image-popup";

import { initialCards } from "./scripts/cards";
import { openNewCardPopup } from "./scripts/popups/create-card"

const newCardButton = document.getElementById('newCardButton');

// @todo: Темплейт карточки
const template = document.getElementById("card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, removeCard) {
  const newCard = template.querySelector(".card").cloneNode(true);
  // Подстановка данных
  const image = newCard.querySelector(".card__image");
  image.src = data.link;
  image.alt = data.name;
  newCard.querySelector(".card__title").textContent = data.name;

  // добавление логики попапа для просмотра изображения
  image.addEventListener('click', () => {
    showImagePopup(image.src, image.alt);
})

  // Настройка кнопки удаления
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(newCard));

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.append(cardElement);
});

// Открытие модального окна по клику на кнопку создания карточки
newCardButton.addEventListener('click', () => openNewCardPopup(createCard, deleteCard, placesList));
