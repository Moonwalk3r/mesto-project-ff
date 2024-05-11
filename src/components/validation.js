
const disableSubmitButton = (button, config) => {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  }
  
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };
  // Функция очистки форм и деактивации кнопки 
  const clearValidation = (profileForm, validationConfig) => {
    const inputElements = Array.from(profileForm.querySelectorAll('input'));
    const buttonElement = profileForm.querySelector('button');
  
    disableSubmitButton(buttonElement, validationConfig);
    inputElements.forEach((el) => {
      hideInputError(profileForm, el, validationConfig);
      el.value = '';
    });
  }; 
  
  // Функция валидации
  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    
    const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(obj.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(obj.errorClass);
    };
  
    const checkInputValidity = (formElement, inputElement) => {
      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }
    
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement, obj);
      }
    };
    
    const hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !(inputElement.validity.valid)
      })
    }
    
    const toggleButtonState = (inputList, buttonElement) => {
      if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, obj)
      } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
      }
    } 
    
    const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
      const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    
      toggleButtonState(inputList, buttonElement);
    
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };
  
    formList.forEach((formElement) => {
      setEventListeners(formElement);
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    });
  };
  
  export { clearValidation, enableValidation };