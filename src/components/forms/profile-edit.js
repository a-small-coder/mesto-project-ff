import { validateInput } from "../validation";

export const editProfileForm = document.forms["edit-profile"]; // форма редактирования профиля

export const profileTitle = document.querySelector('.profile__title'); // Заголовок профиля
export const profileDescription = document.querySelector('.profile__description'); // Описание профиля
export const errorProfileName = document.getElementById('profileNameError'); // Заголовок профиля
export const errorProfileDesc = document.getElementById('profileDescriptionError'); // Описание профиля
export const profileSaveButton = editProfileForm.querySelector('.button');

const nameProps = {
    input: editProfileForm.name,
    errorElement: errorProfileName, 
    minLength: 2, 
    maxLength: 40
}

const descProps = {
    input: editProfileForm.description, 
    errorElement: errorProfileDesc, 
    minLength: 2, 
    maxLength: 200
}

export function handleProfileFormSubmit(event, changeRequest) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    validateProfileForm(); // Валидируем форму

    // Сохраняем данные формы
    // profileTitle.textContent = editProfileForm.name.value;
    // profileDescription.textContent = editProfileForm.description.value;
    changeRequest({
        name: editProfileForm.name.value,
        about: editProfileForm.description.value,
    })
}

export const clearValidationErrors = () => {
    errorProfileName.textContent = '';
    errorProfileDesc.textContent = '';
};

export function validateProfileForm(){
    // валидация формы
    const isNameValid = validateInput(nameProps);
    const isDescriptionValid = validateInput(descProps);
    
    if (isNameValid && isDescriptionValid){
        toggleSaveButtonDisable(profileSaveButton, 'remove');// Активируем кнопку, если оба поля валидны
        clearValidationErrors();
    } else {// Деактивируем кнопку, если есть ошибки валидации
        toggleSaveButtonDisable(profileSaveButton, 'add');
    }
}