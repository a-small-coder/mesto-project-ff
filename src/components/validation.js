export function validateLinkInput(props) {
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

export const validateInput = (props) => {
    const { input, errorElement, minLength, maxLength } = props
    const valueTrimmed = input.value.trim();
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; // Регулярное выражение для проверки
    if (valueTrimmed.length < minLength || valueTrimmed.length > maxLength) {
        errorElement.textContent = `Должно быть от ${minLength} до ${maxLength} символов.`;
        toggleInputError(input, 'add');
        return false;
    }
    
    if (!regex.test(valueTrimmed)) {
        errorElement.textContent = 'Допустимы только латинские и кириллические буквы, пробелы и дефисы.';
        toggleInputError(input, 'add');
        return false;
    }

    errorElement.textContent = '';
    toggleInputError(input, 'remove');

    return true;
};

export function toggleInputError(input, variant='add'){
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

export function toggleSaveButtonDisable(button, variant='add'){
    if (variant === 'add'){
        button.disabled = true; // Деактивируем кнопку
        if (!button.classList.contains('button-disabled')){
            button.classList.add('button-disabled')
        }
    } 

    if ( variant === 'remove') {
        button.disabled = false; // Активируем кнопку
        if (button.classList.contains('button-disabled')){
            button.classList.remove('button-disabled')
        }
    }
}