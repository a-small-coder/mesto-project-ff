

export function handleCreateCardForm(props) {
    
    const {event, form, createCard, cardList, showImagePopup} = props

    event.preventDefault(); // Предотвращаем перезагрузку страницы
    // Получаем данные из формы
    const cardData = {
        name: form['place-name'].value,
        link: form['link'].value
    };

    // Создаем карточку с помощью функции createCard
    const newCard = createCard(cardData, showImagePopup);
    
    // Добавляем новую карточку на страницу 
    cardList.prepend(newCard);

    // Очищаем форму перед открытием
    form.reset();
}
