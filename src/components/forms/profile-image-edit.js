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

function validateLinkInput(props) {
    const {input, errorElement} = props;
    const isLinkValid = input.checkValidity(); // Проверка на валидный URL
    if (!isLinkValid){
        errorElement.textContent = 'Введите корректный URL.';
        toggleInputError(input, 'add');
        return false;
    }
    errorElement.textContent = '';
    toggleInputError(input, 'remove');
    return true
}

function toggleInputError(input, variant='add'){
    if (variant === 'add'){
        if (!input.classList.contains('input-error')){
            input.classList.add('input-error');
        }
    } 

    if ( variant === 'remove') {
        if (input.classList.contains('input-error')){
            input.classList.remove('input-error');
        }
    }
}

function toggleSaveButtonDisable(variant='add'){
    if (variant === 'add'){
        profileImageSaveButton.disabled = true; // Деактивируем кнопку
        if (!profileImageSaveButton.classList.contains('button-disabled')){
            profileImageSaveButton.classList.add('button-disabled')
        }
    } 

    if ( variant === 'remove') {
        profileImageSaveButton.disabled = false; // Активируем кнопку
        if (profileImageSaveButton.classList.contains('button-disabled')){
            profileImageSaveButton.classList.remove('button-disabled')
        }
    }
}

export const clearValidationErrors = (disableButton='remove') => {
    errorProfileName.textContent = '';
    toggleInputError(profileImageForm['link'], 'remove');
    toggleSaveButtonDisable(disableButton);
};

export function validateProfileImageForm(){
    const isLinkValid = validateLinkInput(linkProps);

    if (isLinkValid){
        toggleSaveButtonDisable('remove');
    } else {
        toggleSaveButtonDisable('add');
    }
}