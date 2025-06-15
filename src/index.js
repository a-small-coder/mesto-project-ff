import "./styles/pages/index.css";

import { openPopup, closePopup, addPopupCloseTarget} from "./components/modal";
import { createCard } from "./components/card";

import {
  getCards,
  getUserInfo,
  changeAvatar,
  addCard,
  changeProfile,
} from './api/index.js';
import { validateImageUrl } from './utils/imageValidation.js';
import { enableValidation, clearValidation } from "./components/validation";

// Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button-disabled',
  inputErrorClass: 'input-error',
  errorClass: 'form__input-error'
};

// -----------------------------------------------------------------------------------------------------
// DOM узлы
// -----------------------------------------------------------------------------------------------------

const placesList = document.querySelector(".places__list"); // контейнер для карточек

const newCardButton = document.getElementById('newCardButton'); // кнопка на странице для создания карточки
const popupCard = document.querySelector('.popup_type_new-card'); // модальное окно для создания карточки
const newCardForm = popupCard.querySelector('.popup__form'); // форма создания карточки
const cardSaveButton = newCardForm.querySelector('.button'); // кнопка сохранения формы для создания карточки

const profileTitle = document.querySelector('.profile__title'); // Заголовок профиля
const profileDescription = document.querySelector('.profile__description'); // Описание профиля
const editProfileButton = document.getElementById('editProfileButton'); // кнопка для редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit'); // модальное окно для редактирования профиля
const editProfileForm = popupEdit.querySelector('.popup__form'); // форма редактирования профиля
const profileSaveButton = editProfileForm.querySelector('.button'); // кнопка сохранения формы для редактирования профиля

const popupImage = document.querySelector('.popup_type_image'); // модальное окно для изображения
const imageInPopup = document.getElementById('popupImage'); // Изображение в модальном окне с картинкой
const captionInPopup = document.getElementById('popupCaption'); // Подпись изображения в модальном окне с картинкой

const profileImage = document.querySelector('.profile__image'); // аватарка пользователя
const profileImageChangeButton = document.querySelector('.profile__image-container'); // кнопка на страницедля редактирования аватарки
const profileImagePopup = document.querySelector('.popup_type_avatar'); // модальное окно для редактирования аватарки
const profileImageForm = profileImagePopup.querySelector('.popup__form'); // форма редактирования аватарки
const profileImageSaveButton = profileImageForm.querySelector('.button'); // кнопка сохранения формы для редактирования аватарки


let userId;

// Инициализация валидации всех форм
enableValidation(validationConfig);

// -----------------------------------------------------------------------------------------------------
// Рендер карточек и данных пользователя
// -----------------------------------------------------------------------------------------------------

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    // Проверяем, есть ли аватар и он валидный
    if (userData.avatar && userData.avatar.trim() !== '') {
      profileImage.src = userData.avatar;
    }
    userId = userData._id;

    cardsData.forEach((cardData) => {
      const cardElement = createCard(cardData, showImagePopup, userId);
      placesList.append(cardElement);
    });
  })
  .catch((error) => {
    console.error('Ошибка загрузки данных:', error);
    // В случае ошибки оставляем изображение по умолчанию из HTML
  });

// -----------------------------------------------------------------------------------------------------
// Добавление обработчиков для модальных окон
// -----------------------------------------------------------------------------------------------------

// Открытие модального окна по клику на кнопку создания карточки
newCardButton.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(popupCard)
});

// Открытие модального окна по клику на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => {
  clearValidation(editProfileForm, validationConfig);
  openEditProfilePopup(editProfileForm);
});

// Открытие модального окна по клику на кнопку редактирования аватарки
profileImageChangeButton.addEventListener('click', () => {
  clearValidation(profileImageForm, validationConfig);
  openPopup(profileImagePopup);
});

// Добавляем анимацию на все модальные окна
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

// Добавляем условия закрытия попапа
popups.forEach ((popup)=> {
  popup.addEventListener('mousedown', (event) => addPopupCloseTarget(event, popup));
})

// -----------------------------------------------------------------------------------------------------
// Обработка форм
// -----------------------------------------------------------------------------------------------------

// Функция для показа ошибки валидации изображения
function showImageError(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  input.classList.add('input-error');
  errorElement.textContent = 'Не удалось загрузить изображение. Проверьте URL и попробуйте снова.';
}

// Обработка отправки формы создания карточки
newCardForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  cardSaveButton.textContent = 'Сохранение...';
  
  const cardData = {
    name: newCardForm['place-name'].value,
    link: newCardForm.link.value
  }

  try {
    // проверка что изображние можно загрузить
    const isValid = await validateImageUrl(cardData.link);
    if (!isValid) {
      showImageError(newCardForm.link);
      return;
    }

    const res = await addCard(cardData);
    // Создаем карточку с помощью функции createCard
    const newCard = createCard(res, showImagePopup, userId);
    // Добавляем новую карточку на страницу 
    placesList.prepend(newCard);
    closePopup(popupCard);
    newCardForm.reset();
  } catch (error) {
    console.error('Ошибка при создании карточки:', error);
    showImageError(newCardForm.link);
  } finally {
    cardSaveButton.textContent = 'Сохранить';
  }
});

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  profileSaveButton.textContent = 'Сохранение...';
  
  const profileData = {
    name: editProfileForm.name.value,
    about: editProfileForm.description.value
  }
  
  changeProfile(profileData)
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closePopup(popupEdit);
  })
  .catch((error) => {
    console.error('Ошибка при изменении профиля:', error);
  })
  .finally(() => {
    profileSaveButton.textContent = 'Сохранить';
  });
});

profileImageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const imageLink = profileImageForm['avatar-url'].value;
  
  try {
    profileImageSaveButton.textContent = 'Сохранение...';
    
    // проверка что изображние можно загрузить
    const isValid = await validateImageUrl(imageLink);
    if (!isValid) {
      showImageError(profileImageForm['avatar-url']);
      return;
    }

    const response = await changeAvatar(imageLink);
    profileImage.src = response.avatar;
    closePopup(profileImagePopup);
    profileImageForm.reset();
  } catch (error) {
    console.error('Ошибка при изменении аватара:', error);
    showImageError(profileImageForm['avatar-url']);
  } finally {
    profileImageSaveButton.textContent = 'Сохранить';
  }
});

// -----------------------------------------------------------------------------------------------------
// Функции для открытия модальных окон
// -----------------------------------------------------------------------------------------------------

// Функция для открытия модального окна изображения
export function showImagePopup(imageSrc, imageDesc) {
  
  imageInPopup.src = imageSrc; // Устанавливаем изображение в модальном окне
  imageInPopup.alt = imageDesc; // Устанавливаем alt для изображения в модальном окне
  captionInPopup.textContent = imageDesc; // Устанавливаем подпись
  
  // Показываем модальное окно
  openPopup(popupImage)
}

// Функция для открытия модального окна редактирования профиля
export function openEditProfilePopup(editProfileForm) {

  // Заполняем форму текущими данными из HTML
  editProfileForm.name.value = profileTitle.textContent;
  editProfileForm.description.value = profileDescription.textContent;

  // Показываем модальное окно
  openPopup(popupEdit)
}