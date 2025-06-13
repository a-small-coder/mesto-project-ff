// Функция активации валидации для всех форм
export function enableValidation(settings) {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = settings;
  
  const forms = document.querySelectorAll(formSelector);
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);
    
    // Функция валидации отдельного поля
    const validateField = (input) => {
      // Находим соответствующий элемент ошибки для данного input
      const errorElement = findErrorElement(input, form, errorClass);
      
      // Проверяем валидность поля (включая кастомные правила)
      const isValid = checkFieldValidity(input);
      
      if (isValid) {
        hideInputError(input, errorElement, inputErrorClass);
      } else {
        // Показываем кастомное сообщение об ошибке
        const errorMessage = getCustomErrorMessage(input);
        showInputError(input, errorElement, inputErrorClass, errorMessage);
      }
      
      // Проверяем валидность всей формы
      toggleButtonState(inputs, submitButton, inactiveButtonClass);
    };
    
    // Добавляем обработчики для каждого поля
    inputs.forEach(input => {
      input.addEventListener('input', () => validateField(input));
      input.addEventListener('blur', () => validateField(input));
    });
    
    // Инициализируем состояние кнопки
    toggleButtonState(inputs, submitButton, inactiveButtonClass);
  });
}

// Функция очистки ошибок валидации
export function clearValidation(form, settings) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = settings;
  
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  
  inputs.forEach(input => {
    const errorElement = findErrorElement(input, form, errorClass);
    hideInputError(input, errorElement, inputErrorClass);
  });
  
  // Активируем кнопку
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

// Константы для валидации
const TEXT_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

// Правила валидации для разных типов полей
const VALIDATION_RULES = {
  'name': { minLength: 2, maxLength: 40, regex: TEXT_REGEX },
  'place-name': { minLength: 2, maxLength: 40, regex: TEXT_REGEX },
  'description': { minLength: 2, maxLength: 200, regex: TEXT_REGEX }
};

// Вспомогательные функции

function showInputError(input, errorElement, inputErrorClass, errorMessage) {
  input.classList.add(inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
}

function hideInputError(input, errorElement, inputErrorClass) {
  input.classList.remove(inputErrorClass);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
  const hasInvalidInput = Array.from(inputs).some(input => !checkFieldValidity(input));
  
  if (hasInvalidInput) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

// Функция для поиска соответствующего элемента ошибки
function findErrorElement(input, form, errorClass) {
  // Ищем элемент ошибки, который следует за данным input
  let nextElement = input.nextElementSibling;
  while (nextElement) {
    if (nextElement.classList.contains(errorClass)) {
      return nextElement;
    }
    nextElement = nextElement.nextElementSibling;
  }
  
  // Если не нашли, возвращаем первый элемент ошибки в форме
  return form.querySelector(`.${errorClass}`);
}

// Функция для получения кастомного сообщения об ошибке
function getCustomErrorMessage(input) {
  const value = input.value.trim();
  
  // Проверяем тип поля и возвращаем соответствующее сообщение
  if (input.type === 'url') {
    if (!input.validity.valid) {
      return 'Введите корректный URL.';
    }
  }
  
  // Проверяем кастомные правила валидации
  const fieldName = input.name;
  if (VALIDATION_RULES[fieldName]) {
    const rules = VALIDATION_RULES[fieldName];
    
    if (value.length < rules.minLength || value.length > rules.maxLength) {
      return `Должно быть от ${rules.minLength} до ${rules.maxLength} символов.`;
    }
    
    if (!rules.regex.test(value)) {
      return 'Допустимы только латинские и кириллические буквы, пробелы и дефисы.';
    }
  }
  
  // Возвращаем стандартное сообщение браузера
  return input.validationMessage;
}

// Функция для проверки валидности поля (включая кастомные правила)
function checkFieldValidity(input) {
  const value = input.value.trim();
  
  // Сначала проверяем стандартную валидацию браузера
  if (!input.validity.valid) {
    return false;
  }
  
  // Проверяем кастомные правила валидации
  const fieldName = input.name;
  if (VALIDATION_RULES[fieldName]) {
    const rules = VALIDATION_RULES[fieldName];
    
    if (value.length < rules.minLength || value.length > rules.maxLength) {
      return false;
    }
    
    if (!rules.regex.test(value)) {
      return false;
    }
  }
  
  return true;
} 