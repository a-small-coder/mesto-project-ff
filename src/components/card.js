
// работа с карточками
// Темплейт карточки
const template = document.getElementById("card-template").content;

// создание карточки
// Функция создания карточки
export function createCard(data, showImagePopup, removeCard=deleteCard, toggleLike=handleLikeButtonClick) {
  const newCard = template.querySelector(".card").cloneNode(true);
  // Добавляем данные в новую карточку
  const image = newCard.querySelector(".card__image");
  image.src = data.link;
  image.alt = data.name;
  newCard.querySelector(".card__title").textContent = data.name;

  // Добавляем попап для просмотра изображения
  image.addEventListener('click', () => {
    showImagePopup(image.src, image.alt);
  })

  // Настройка кнопки удаления
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(newCard));

  // Настройка кнопки лайка
  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => toggleLike(likeButton));
  
  return newCard;
  }

// удаление карточки
// Функция для удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
  }

// лайк для карточки
// Функция для обработки клика на иконку лайка
export function handleLikeButtonClick(likeButton) {
    // Меняем css класс для иконки
    likeButton.classList.toggle('card__like-button_is-active');
  }