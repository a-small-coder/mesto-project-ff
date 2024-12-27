import "./styles/pages/index.css";

import { openPopup, closePopup, addPopupCloseTarget} from "./components/modal";
import { createCard } from "./components/card";
import { initialCards } from "./data/cards";
import { 
  editProfileForm,
  profileTitle,
  profileDescription,
  validateProfileForm,
  handleProfileFormSubmit
} from "./components/forms/profile-edit";
import { 
  newCardForm,
  validateCreateCardForm,
  clearValidationErrors as clearCardFormErrors,
  handleCreateCardForm 
} from "./components/forms/create-card";


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

// -----------------------------------------------------------------------------------------------------
// Рендер карточек
// -----------------------------------------------------------------------------------------------------


// Выводим карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, showImagePopup);
  placesList.append(cardElement);
});

// -----------------------------------------------------------------------------------------------------
// Добавление обработчиков для модальных окон
// -----------------------------------------------------------------------------------------------------

// Открытие модального окна по клику на кнопку создания карточки
newCardButton.addEventListener('click', () => {
  clearCardFormErrors();
  openPopup(popupCard)
});

// Открытие модального окна по клику на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => openEditProfilePopup(editProfileForm));

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
  const formProps = {
    event, 
    createCard, 
    cardList: placesList, 
    showImagePopup
  }
  handleCreateCardForm(formProps);
  closePopup(popupCard);
});

// Валидация формы профиля при изменении данных в инпуте
editProfileForm.addEventListener('input', validateProfileForm);

// Обработка отправки формы редактирования профиля
editProfileForm.addEventListener('submit', (event) => {
  handleProfileFormSubmit(event); 
  closePopup(popupEdit);
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
