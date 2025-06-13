import "./styles/pages/index.css";

import { openPopup, closePopup, addPopupCloseTarget} from "./components/modal";
import { createCard } from "./components/card";
import { 
  editProfileForm,
  profileTitle,
  profileDescription,
  handleProfileFormSubmit,
  profileSaveButton,
} from "./components/forms/profile-edit";
import { 
  newCardForm,
  cardSaveButton,
  handleCreateCardForm 
} from "./components/forms/create-card";

import {
  profileImageForm,
  handleChangeProfileImageSubmit,
  profileImageSaveButton,
  profileImage,
} from './components/forms/profile-image-edit';

import {
  getCards,
  getUserInfo,
  changeAvatar,
  createCard as createCardRequest,
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

const popupCard = document.querySelector('.popup_type_new-card'); // модальное окно для создания карточки
const popupEdit = document.querySelector('.popup_type_edit'); // модальное окно для редактирования профиля
const popupImage = document.querySelector('.popup_type_image'); // модальное окно для изображения

const editProfileButton = document.getElementById('editProfileButton'); // кнопка для редактирования профиля
const newCardButton = document.getElementById('newCardButton'); // кнопка для создания карточки

const imageInPopup = document.getElementById('popupImage'); // Изображение в модальном окне с картинкой
const captionInPopup = document.getElementById('popupCaption'); // Подпись изображения в модальном окне с картинкой

const profileImagePopup = document.querySelector('.popup_type_avatar');
const profileImageChangeButton = document.querySelector('.profile__image-container');

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

// Обработка отправки формы создания карточки
newCardForm.addEventListener('submit', (event) => {
  function createRequest (formData) {
    cardSaveButton.textContent = 'Сохранение...'
    return createCardRequest(formData).then((res) => {
      // Создаем карточку с помощью функции createCard
      const newCard = createCard(res, showImagePopup, userId);
      // Добавляем новую карточку на страницу 
      placesList.prepend(newCard);
      closePopup(popupCard);
      cardSaveButton.textContent = 'Сохранить'
    }).catch((error) => {
      console.error('Ошибка при создании карточки:', error);
      cardSaveButton.textContent = 'Сохранить'
    });
  }
  handleCreateCardForm(event, createRequest);
});

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (event) => {
  function changeRequest (formData) {
    profileSaveButton.textContent = 'Сохранение...'
    return changeProfile(formData).then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      profileSaveButton.textContent = 'Сохранить'
      closePopup(popupEdit);
    }).catch((error) => {
      console.error('Ошибка при изменении профиля:', error);
      profileSaveButton.textContent = 'Сохранить'
    });
  }
  handleProfileFormSubmit(event, changeRequest);
});

profileImageForm.addEventListener('submit', (event) =>{
  async function createImageRequest(imageLink) {
    try {
      const isValid = await validateImageUrl(imageLink);
      if (!isValid) {
        // Показываем ошибку валидации
        const linkInput = profileImageForm.querySelector('input[name="link"]');
        const errorElement = profileImageForm.querySelector('.form__input-error');
        linkInput.classList.add('input-error');
        errorElement.textContent = 'Не удалось загрузить изображение. Проверьте URL и попробуйте снова.';
        return; // Просто выходим из функции, не создаем ошибку
      }
      
      profileImageSaveButton.textContent = 'Сохранение...'
      const response = await changeAvatar(imageLink);
      profileImage.src = response.avatar;
      closePopup(profileImagePopup);
      profileImageSaveButton.textContent = 'Сохранить'
    } catch (error) {
      console.error('Ошибка при изменении аватара:', error);
      // Показываем ошибку валидации
      const linkInput = profileImageForm.querySelector('input[name="link"]');
      const errorElement = profileImageForm.querySelector('.form__input-error');
      linkInput.classList.add('input-error');
      errorElement.textContent = 'Не удалось загрузить изображение. Проверьте URL и попробуйте снова.';
      profileImageSaveButton.textContent = 'Сохранить'
    }
  }

  handleChangeProfileImageSubmit(event, createImageRequest);
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