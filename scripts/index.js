// @todo: Темплейт карточки
const template = document.getElementById("card-template");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, removeCard) {
  const newCard = template.content.cloneNode(true).querySelector(".card");

  // Подстановка данных
  const image = newCard.querySelector(".card__image");
  image.src = data.link;
  image.alt = data.name;
  newCard.querySelector(".card__title").textContent = data.name;

  // Настройка кнопки удаления
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    newCard.remove();
    removeCard(data); // Вызов функции для обработки удаления
  });

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard(cardData) {
  const index = array.indexOf(cardData);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.appendChild(cardElement);
});
