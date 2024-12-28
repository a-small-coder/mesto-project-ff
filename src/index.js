import "./styles/pages/index.css";

import { openPopup, closePopup, addPopupCloseTarget} from "./components/modal";
import { createCard } from "./components/card";
import { 
  editProfileForm,
  profileTitle,
  profileDescription,
  validateProfileForm,
  handleProfileFormSubmit,
  profileSaveButton,
} from "./components/forms/profile-edit";
import { 
  newCardForm,
  validateCreateCardForm,
  clearValidationErrors as clearCardFormErrors,
  cardSaveButton,
  handleCreateCardForm 
} from "./components/forms/create-card";

import {
  profileImageForm,
  handleChangeProfileImageSubmit,
  validateProfileImageForm,
  clearValidationErrors as clearProfileImageFormErrors,
  profileImageSaveButton,
  profileImage,
} from './components/forms/profile-image-edit';

import {
  getCards,
  getUserInfo,
  changeAvatar,
  createCard as createCardRequest,
  changeProfile,
  validateImageUrl,
} from './api/index.js';


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

// -----------------------------------------------------------------------------------------------------
// Рендер карточек и данных пользователя
// -----------------------------------------------------------------------------------------------------

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    userId = userData._id;

    cardsData.forEach((cardData) => {
      const cardElement = createCard(cardData, showImagePopup, userId);
      placesList.append(cardElement);
    });
  })
  .catch(console.error);

// -----------------------------------------------------------------------------------------------------
// Добавление обработчиков для модальных окон
// -----------------------------------------------------------------------------------------------------

// Открытие модального окна по клику на кнопку создания карточки
newCardButton.addEventListener('click', () => {
  clearCardFormErrors('add');
  openPopup(popupCard)
});

// Открытие модального окна по клику на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => openEditProfilePopup(editProfileForm));

profileImageChangeButton.addEventListener('click', () => {
  clearProfileImageFormErrors('add');
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

// Валидация формы создания карточки при изменении данных в инпуте
newCardForm.addEventListener('input', validateCreateCardForm);

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
      });
  }
  handleCreateCardForm(event, createRequest);
});

// Валидация формы профиля при изменении данных в инпуте
editProfileForm.addEventListener('input', validateProfileForm);

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (event) => {
  function changeRequest (formData) {
    profileSaveButton.textContent = 'Сохранение...'
    return changeProfile(formData).then((res) => {
      console.log('change profile ',res)
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      profileSaveButton.textContent = 'Сорханить'
      closePopup(popupEdit);
    });
  }
  handleProfileFormSubmit(event, changeRequest);
});

profileImageForm.addEventListener('input', validateProfileImageForm);

profileImageForm.addEventListener('submit', (event) =>{
  function createImageRequest(imageLink) {
    const isValid = validateImageUrl(imageLink);
    if (!isValid) {
      return Promise.reject(new Error('некорректный url'));
    }
    else {
      profileImageSaveButton.textContent = 'Сохранение...'
      return changeAvatar(imageLink).then((response) => {
        profileImage.src = response.avatar;
        closePopup(profileImagePopup);
        profileImageSaveButton.textContent = 'Сохранить'
      });
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