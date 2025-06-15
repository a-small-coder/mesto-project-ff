// Функция активации валидации для всех форм
export function enableValidation(settings) {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = settings;
  
  const forms = document.querySelectorAll(formSelector);
  
  forms.forEach(form => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);
    
    // Добавляем обработчики для каждого поля
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(form, inputElement, settings);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
      inputElement.addEventListener('blur', () => {
        checkInputValidity(form, inputElement, settings);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
    
    // Инициализируем состояние кнопки
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
}

// Функция отображения ошибки валидации
function showInputError(formElement, inputElement, errorMessage, config) {
  // Получаем id элемента ошибки на основе id инпута
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция скрытия ошибки валидации
function hideInputError(formElement, inputElement, config) {
  // Получаем id элемента ошибки на основе id инпута
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  // НЕ убираем класс errorClass, чтобы элемент всегда занимал место
}

// Проверка полей на валидность
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит паттерн и у нас есть специальное сообщение
    if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
      showInputError(formElement, inputElement, inputElement.dataset.errorMessage, config);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Функция очистки ошибок валидации
export function clearValidation(form, settings) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = settings;
  
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  
  inputList.forEach(inputElement => {
    hideInputError(form, inputElement, settings);
  });
  
  // Проверяем валидность формы и устанавливаем состояние кнопки
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

// Функция для переключения состояния кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  const hasInvalidInput = inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  
  if (hasInvalidInput) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
} 