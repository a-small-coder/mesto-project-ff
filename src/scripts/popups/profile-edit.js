// Получаем элементы
const editProfilePopup = document.getElementById('editProfilePopup');
const closeEditPopup = document.getElementById('closeEditPopup');
const editProfileForm = document.getElementById('editProfileForm');


// Получаем элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Функция для открытия модального окна редактирования профиля
export function openEditProfilePopup() {
    console.log('hello')
    // Заполняем форму текущими данными из HTML
    editProfileForm.name.value = profileTitle.textContent;
    editProfileForm.description.value = profileDescription.textContent; 

    // Показываем модальное окно
    editProfilePopup.style.display = 'flex';
}

// Функция для закрытия модального окна
function hideEditProfilePopup() {
    editProfilePopup.style.display = 'none';
}

function hundleFormSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    // логика для сохранения данных
    profileTitle.textContent = editProfileForm.name.value;
    profileDescription.textContent = editProfileForm.description.value;

    hideEditProfilePopup(); // Закрываем модальное окно после сохранения
}

editProfileForm.addEventListener('submit', hundleFormSubmit);






// Закрытие модального окна по клику на крестик
closeEditPopup.addEventListener('click', () => hideEditProfilePopup());

// Закрытие модального окна по клику на оверлей
editProfilePopup.addEventListener('click', (event) => {
    if (event.target === editProfilePopup) {
        hideEditProfilePopup();
    }
});