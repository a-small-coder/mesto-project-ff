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

export function handleProfileFormSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    validateProfileForm(); // Валидируем форму

    // Сохраняем данные формы
    profileTitle.textContent = editProfileForm.name.value;
    profileDescription.textContent = editProfileForm.description.value;
}

const validateInput = (props) => {
    const { input, errorElement, minLength, maxLength } = props
    const valueTrimed = input.value.trim();
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Регулярное выражение для проверки
    console.log(valueTrimed)
    if (valueTrimed.length < minLength || valueTrimed.length > maxLength) {
        errorElement.textContent = `Должно быть от ${minLength} до ${maxLength} символов.`;
        return false;
    }
    
    if (!regex.test(valueTrimed)) {
        errorElement.textContent = 'Допустимы только латинские и кириллические буквы, пробелы и дефисы.';
        return false;
    }
    
    return true;
};

export const clearValidationErrors = () => {
    errorProfileName.textContent = '';
    errorProfileDesc.textContent = '';
};

export function validateProfileForm(){
    // валидация формы
    const isNameValid = validateInput(nameProps);
    const isDescriptionValid = validateInput(descProps);
    
    if (isNameValid && isDescriptionValid){
        profileSaveButton.disabled = false; // Активируем кнопку, если оба поля валидны
        if (profileSaveButton.classList.contains('button-disabled')){
            profileSaveButton.classList.remove('button-disabled')
        }
        clearValidationErrors();
    } else {
        profileSaveButton.disabled = true; // Деактивируем кнопку, если есть ошибки валидации
        if (!profileSaveButton.classList.contains('button-disabled')){
            profileSaveButton.classList.add('button-disabled')
        }
        
    }
}