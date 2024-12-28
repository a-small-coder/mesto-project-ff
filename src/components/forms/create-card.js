import { toggleInputError, validateInput, validateLinkInput } from "../validation";

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

export const clearValidationErrors = (disableButton='remove') => {
    errorCardName.textContent = '';
    errorImageLink.textContent = '';
    toggleInputError(newCardForm['place-name'], 'remove');
    toggleInputError(newCardForm['link'], 'remove');
    toggleSaveButtonDisable(disableButton);
};

export function validateCreateCardForm(){
    // валидация формы
    const isPlaceNameValid = validateInput(placeNameProps);
    const isLinkValid = validateLinkInput(linkProps);
    
    if (isPlaceNameValid && isLinkValid){
        toggleSaveButtonDisable(cardSaveButton, 'remove');
    } else {
        
        toggleSaveButtonDisable(cardSaveButton, 'add');
        
    }
}
