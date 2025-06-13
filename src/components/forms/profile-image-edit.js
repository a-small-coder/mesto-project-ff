export const profileImageForm = document.forms["change-avatar"]; // форма редактирования аватарки
export const profileImageSaveButton = profileImageForm.querySelector('.button');
export const profileImage = document.querySelector('.profile__image'); // аватарка пользователя

export function handleChangeProfileImageSubmit(event, changeImageRequest) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    changeImageRequest(profileImageForm.link.value)
}