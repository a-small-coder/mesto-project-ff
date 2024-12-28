import { likeCard, removeLikeCard, deleteCard as removeCard } from "../api";

// работа с карточками
// Темплейт карточки
const template = document.getElementById("card-template").content;

let memorizedDeleteButton;

// создание карточки
// Функция создания карточки
export function createCard(data, showImagePopup, userId) {
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

  console.log(data.owner._id, userId)
  if (data.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => {
      memorizedDeleteButton = deleteButton;
    });
  }

  deleteButton.addEventListener("click", () => deleteCard(data._id));

  // Настройка кнопки лайка
  const likeCount = newCard.querySelector('.card__like-count');
  const likeButton = newCard.querySelector(".card__like-button");
  const isLiked = data.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener("click", () => handleLikeButtonClick(likeButton, data._id, likeCount));
  likeCount.textContent = data.likes.length;
  
  return newCard;
  }

// удаление карточки
// Функция для удаления карточки
export function deleteCard(cardId) {
  removeCard(cardId)
  .then(() => {
    memorizedDeleteButton.closest('.places__item').remove();
  })

}

// лайк для карточки
// Функция для обработки клика на иконку лайка
export function handleLikeButtonClick(likeButton, cardId, likeCount) {
    // Меняем css класс для иконки
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    if (cardId) {
      if (isLiked){
        removeLikeCard(cardId).then((cardData) => {
          if (cardData) {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = cardData.likes.length;
          }
        })
        .catch(console.error);
      }
      else{
        likeCard(cardId).then((cardData) => {
          if (cardData) {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = cardData.likes.length;
          }
        })
        .catch(console.error);
      }
    }
  }