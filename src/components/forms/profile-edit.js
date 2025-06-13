export const editProfileForm = document.forms["edit-profile"]; // форма редактирования профиля

export const profileTitle = document.querySelector('.profile__title'); // Заголовок профиля
export const profileDescription = document.querySelector('.profile__description'); // Описание профиля
export const profileSaveButton = editProfileForm.querySelector('.button');

export function handleProfileFormSubmit(event, changeRequest) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сохраняем данные формы
    changeRequest({
        name: editProfileForm.name.value,
        about: editProfileForm.description.value,
    })
}