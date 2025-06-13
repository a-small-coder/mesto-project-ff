export const newCardForm = document.forms["new-place"]; // форма создания карточки
export const cardSaveButton = newCardForm.querySelector('.button');

export function handleCreateCardForm(event, createRequest) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const cardData = {
        name: newCardForm['place-name'].value,
        link: newCardForm['link'].value
    };

    createRequest(cardData);

    // Очищаем форму перед закрытием
    newCardForm.reset();
}
