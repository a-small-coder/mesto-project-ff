// работа с модалками

// функция для удаления всех обработчиков
function removePopupHandlers(popup) {
    // Создаем временные функции для удаления
    const closeByIcon = (event) => hidePopup(popup);
    const closeByOverlay = (event) => {
        if (event.target === popup) {
            hidePopup(popup);
        }
    }
    const closeByESC = (event) => {
        if (event.key === 'Escape') {
            hidePopup(popup);
        }
    }

    const popupCloseIcon = popup.querySelector(".popup__close");
    popupCloseIcon.removeEventListener('click', closeByIcon);
    popup.removeEventListener('click', closeByOverlay);
    document.removeEventListener('keydown', closeByESC);
}

// функция для добавления обработчиков закрытия модалки
function addPopupHandlers(popup) {
    
    const closeByIcon = (event) => hidePopup(popup);
    const closeByOverlay = (event) => {
        if (event.target === popup) {
            hidePopup(popup);
        }
    }
    const closeByESC = (event) => {
        if (event.key === 'Escape') {
            hidePopup(popup);
        }
    }

    const popupCloseIcon = popup.querySelector(".popup__close");
    popupCloseIcon.addEventListener('click', closeByIcon);
    popup.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', closeByESC);

    // addCloseByClickIcon(popup)
    // addCloseByClickOverlay(popup)
    // addCloseByPressESC(popup)
}

// функция закрытия модалки
export function hidePopup(popup) {
    popup.classList.remove('popup_is-opened'); // Скрываем попап

    // Удаляем обработчик события
    removePopupHandlers(popup)
}

// функция закрытия по крестику
// function addCloseByClickIcon (popup) {
//     const popupCloseIcon = popup.querySelector(".popup__close");
//     if (popupCloseIcon !== null) {
//         popupCloseIcon.addEventListener('click', () => hidePopup(popup));
//     }
// }

// // функция закрытия по оверлею
// function addCloseByClickOverlay (popup) {
//     popup.addEventListener('click', (event) => {
//         if (event.target === popup) {
//             hidePopup(popup);
//         }
//     });
// }

// // функция закрытие по Esc
// function addCloseByPressESC (popup) {
//     const handler = (event) => {
//         if (event.key === 'Escape') {
//             hidePopup(popup);
//         }
//     }
//     document.addEventListener('keydown', handler);
// }


// Функция для открытия модального окна изображения
export function showImagePopup(imageSrc, imageAlt, addCloseLogicPopup=addPopupHandlers) {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const popupCaption = document.getElementById('popupCaption');
    
    popupImage.src = imageSrc; // Устанавливаем изображение в модальном окне
    popupCaption.textContent = imageAlt; // Устанавливаем подпись
    
    // Показываем модальное окно
    popup.classList.toggle('popup_is-opened');

    addCloseLogicPopup(popup)
}

// Функция для открытия модального окна редактирования профиля
export function openEditProfilePopup(editProfileForm, addCloseLogicPopup=addPopupHandlers) {
    const popup = document.getElementById('editProfilePopup');

    // Получаем элементы профиля
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Заполняем форму текущими данными из HTML
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent;

    // Показываем модальное окно
    popup.classList.toggle('popup_is-opened');

    addCloseLogicPopup(popup);

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        hidePopup(popup)
    })

}

// Функция для открытия модального окна создания карточки
export function openNewCardPopup(form, addCloseLogicPopup=addPopupHandlers) {
    const popup = document.getElementById('newCardPopup');

    // Очищаем форму перед открытием
    form.reset();

    // Показываем модальное окно
    popup.classList.toggle('popup_is-opened');

    addCloseLogicPopup(popup);    

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        hidePopup(popup)
    })

}


