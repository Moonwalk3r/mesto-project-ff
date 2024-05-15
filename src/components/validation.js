//Добавляем класс ошибки
const showInputError = (formElement, inputElement, errorMessage, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formData.inputErrorClass);
  errorElement.classList.add(formData.errorClass);
  errorElement.textContent = errorMessage;
};

//Удаляем класс ошибки
const hideInputError = (formElement, inputElement, formData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formData.inputErrorClass);
  errorElement.classList.remove(formData.errorClass);  
  errorElement.textContent = '';
};

//Добавляем текст ошибки в зависимости от валидности формы
const checkInputValidity = (formElement, inputElement, formData) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
  inputElement.setCustomValidity("");
}
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formData);
  } else {
    hideInputError(formElement, inputElement, formData);
  }
};

//Проверка полей на валидность
const hasInvalidInput = (iputList) => {
  return iputList.some((inputElement) => {
    return !inputElement.validity.valid
  }) 
}

//Отключение кнопки
const disableSubmitButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
};

const enableSubmitButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, formData) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, formData);
  } else {
    enableSubmitButton(buttonElement, formData);
  }
};

//Событие ввода инпута
const setEventListeners = (formElement, formData) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
  const buttonElement = formElement.querySelector(formData.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formData)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formData);
      toggleButtonState(inputList, buttonElement, formData)
    });
  });
};

//Событие сабмита инпута
const enableValidation = (formData) => {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement, formData);
  })
  }

//Функция отчиски ошибок валидации при закрытии формы    
const clearValidation = (formElement, formData) => {
  const inputList = Array.from(formElement.querySelectorAll(formData.inputSelector));
  const buttonElement = formElement.querySelector(formData.submitButtonSelector);
  buttonElement.classList.add(formData.inactiveButtonClass);
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formData);
    inputElement.setCustomValidity("");
  });
};

export {enableValidation, clearValidation};