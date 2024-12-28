export const newCardForm = document.forms["new-place"]; // форма создания карточки

export const errorCardName = document.getElementById('placeNameDescriptionError'); // Описание ошибки для названия карточки
export const errorImageLink = document.getElementById('LinkDescriptionError'); // Описание ошибки для ссылки
export const cardSaveButton = newCardForm.querySelector('.button');

const placeNameProps = {
    input: newCardForm['place-name'],
    errorElement: errorCardName, 
    minLength: 2, 
    maxLength: 30
}

const linkProps = {
    input: newCardForm['link'], 
    errorElement: errorImageLink
}

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
    clearValidationErrors('add');
}

const validatePlaceNameInput = (props) => {
    const { input, errorElement, minLength, maxLength } = props
    const valueTrimed = input.value.trim();
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Регулярное выражение для проверки
    console.log(valueTrimed, regex.test(valueTrimed))
    if (valueTrimed.length < minLength || valueTrimed.length > maxLength) {
        errorElement.textContent = `Название должно содержать от ${minLength} до ${maxLength} символов.`;
        toggleInputError(input, 'add');
        return false;
    }
    
    if (!regex.test(valueTrimed)) {
        errorElement.textContent = 'Название может включать только буквы, пробелы и дефисы.';
        toggleInputError(input, 'add');
        return false;
    }
    errorElement.textContent = '';
    toggleInputError(input, 'remove');
    
    return true;
};

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

function toggleSaveButtonDisable(variant='add'){
    if (variant === 'add'){
        cardSaveButton.disabled = true; // Деактивируем кнопку
        if (!cardSaveButton.classList.contains('button-disabled')){
            cardSaveButton.classList.add('button-disabled')
        }
    } 

    if ( variant === 'remove') {
        cardSaveButton.disabled = false; // Активируем кнопку
        if (cardSaveButton.classList.contains('button-disabled')){
            cardSaveButton.classList.remove('button-disabled')
        }
    }
}

export const clearValidationErrors = (disableButton='remove') => {
    errorCardName.textContent = '';
    errorImageLink.textContent = '';
    toggleInputError(newCardForm['place-name'], 'remove');
    toggleInputError(newCardForm['link'], 'remove');
    toggleSaveButtonDisable(disableButton);
};

export function validateCreateCardForm(){
    // валидация формы
    const isPlaceNameValid = validatePlaceNameInput(placeNameProps);
    const isLinkValid = validateLinkInput(linkProps);
    
    if (isPlaceNameValid && isLinkValid){
        toggleSaveButtonDisable('remove');
    } else {
        
        toggleSaveButtonDisable('add');
        
    }
}
