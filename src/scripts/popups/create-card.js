
// Получаем элементы
const newCardPopup = document.getElementById('newCardPopup');
const closeNewCardPopup = document.getElementById('closeNewCardPopup');
const newCardForm = document.getElementById('newCardForm');

// Функция для открытия модального окна создания карточки
export function openNewCardPopup(createCard, removeCard, cardList) {
    // Очищаем форму перед открытием
    newCardForm.reset();
    // Показываем модальное окно
    newCardPopup.style.display = 'flex';

    // Обработка отправки формы
    newCardForm.addEventListener('submit', (event) => handleCreateForm(
        event, createCard, removeCard, cardList
        ));
}

// Функция для закрытия модального окна
function hideNewCardPopup() {
    newCardPopup.style.display = 'none';
}

function handleCreateForm(event, createCard, removeCard, cardList) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const cardData = {
        name: newCardForm['place-name'].value,
        link: newCardForm['link'].value
    };

    // Создаем карточку с помощью функции createCard
    const newCard = createCard(cardData, removeCard);
    
    // Добавляем новую карточку на страницу (например, в контейнер с карточками)
    cardList.appendChild(newCard);

    hideNewCardPopup(); // Закрываем модальное окно после сохранения
}

// Закрытие модального окна по клику на крестик
closeNewCardPopup.addEventListener('click', hideNewCardPopup);

// Закрытие модального окна по клику на оверлей
newCardPopup.addEventListener('click', (event) => {
    if (event.target === newCardPopup) {
        hideNewCardPopup();
    }
});

// Закрытие модального окна по нажатию клавиши Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideNewCardPopup();
    }
});

