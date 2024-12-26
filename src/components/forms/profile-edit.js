export function handleProfileFormSubmit(props) {
    const { event, form, oldTitle, oldDescription } = props
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сохраняем данные формы
    oldTitle.textContent = form.name.value;
    oldDescription.textContent = form.description.value;
}
