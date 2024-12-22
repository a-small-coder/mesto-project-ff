
export function hundleFormSubmit(event, form) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем элементы профиля
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Сохраняем данные формы
    profileTitle.textContent = form.name.value;
    profileDescription.textContent = form.description.value;
}
