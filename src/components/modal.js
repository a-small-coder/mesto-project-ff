// работа с модалками

export let currentPopup = null; 

// Функция закрытия модалки по кнопке ESC
function closeByESC(event) {
    if (event.key === "Escape") { 
        closePopup(currentPopup); 
        currentPopup = null; 
    }
}

// Функция для открытия модального окна
export function openPopup(popup) {
    popup.classList.add('popup_is-opened'); // Показываем попап
    document.addEventListener('keydown', closeByESC);
    // Сохраняем текущий открытый попап
    currentPopup = popup;
}

// Функция для закрытия модального окна
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened'); // Скрываем попап
    // Удаляем обработчик события
    document.removeEventListener('keydown', closeByESC);
    currentPopup = null;
}

// Функция закрытия модального окна по клику на оверлей и крестик
export function addPopupCloseTarget(event, popup) {
    if (event.target.classList.contains('popup_is-opened')) {
        closePopup(popup)
    }
    if (event.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
}