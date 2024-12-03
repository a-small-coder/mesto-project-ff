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

  // Настройка кнопки удаления
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(newCard));

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
