import { openEditProfilePopup } from './profile-edit'

// Получаем элементы
const popup = document.getElementById('imagePopup');
const closePopup = document.getElementById('closePopup');

const editProfileButton = document.getElementById('editProfileButton');

// Функция для закрытия модального окна
function hidePopup() {
    popup.style.display = 'none'; // Скрываем модальное окно
}

// Закрытие модального окна по клику на крестик
if (closePopup !== null) {
    closePopup.addEventListener('click', hidePopup);
}

// Закрытие модального окна по клику на оверлей
if (popup !== null){
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            hidePopup();
        }
    });
}

// Закрытие модального окна по нажатию клавиши Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hidePopup();
    }
});

console.log('editProfileButton', editProfileButton)
// Открытие модального окна по клику на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => openEditProfilePopup());