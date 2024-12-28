import { toggleInputError, toggleSaveButtonDisable } from "../validation";

export const profileImageForm = document.forms["change-avatar"]; // форма редактирования аватарки
export const errorProfileName = document.getElementById('profileImageError'); 
export const profileImageSaveButton = profileImageForm.querySelector('.button');
export const profileImage = document.querySelector('.profile__image'); // аватарка пользователя

const linkProps = {
    input: profileImageForm['link'], 
    errorElement: errorProfileName
}


export function handleChangeProfileImageSubmit(event, changeImageRequest) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    validateProfileImageForm(); // Валидируем форму

    changeImageRequest(profileImageForm.link.value)
}

export const clearValidationErrors = (disableButton='remove') => {
    errorProfileName.textContent = '';
    toggleInputError(profileImageForm['link'], 'remove');
    toggleSaveButtonDisable(profileImageSaveButton, disableButton);
};

export function validateProfileImageForm(){
    const isLinkValid = validateLinkInput(linkProps);
    const toggleMode = isLinkValid ? 'remove' : 'add';
    toggleSaveButtonDisable(profileImageSaveButton, toggleMode);
}