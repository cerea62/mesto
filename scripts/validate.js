
function showError(inputElement, errorElement, config) {   // функция, которая показываетошибку
    inputElement.classList.add(config.errorInputClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {  //функция, которая прячет ошибку
    inputElement.classList.remove(config.errorInputClass);
    errorElement.textContent = inputElement.validationMessage;
}

function disabledButton(buttonElement, config) { //функция, которая делает кнопку неактивной
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.disableButtonClass);
}

function enableButton(buttonElement, config) { //функция для активной кнопки
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.disableButtonClass);
}

function toggleButtonStatus(buttonElement, isActive, config) { //функция, которая устанавливает активность кнопки
    if (!isActive) {
        disabledButton(buttonElement, config);
    }
    else {
        enableButton(buttonElement, config);
    }
}

function checkInputElement(inputElement, formElement, config) {  // функция проверки валидности
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!errorElement) return; //если span для ошибки не найден, выйти
    if (!isInputValid) {
        showError(inputElement, errorElement, config);
    }
    else {
        hideError(inputElement, errorElement, config);
    }
}

function resetError(formElement, config) {
    const inputsList = formElement.querySelectorAll(config.inputSelector);
    [...inputsList].forEach((inputElement) => {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(config.errorInputClass);
        errorElement.textContent = '';
        formElement.reset();
    })
}

function setEventLisneter(formElement, config) { // добавляет слушателя на событие submit
    const inputsList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonStatus(submitButtonElement, formElement.checkValidity(), config);
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    [...inputsList].forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            toggleButtonStatus(submitButtonElement, formElement.checkValidity(), config);
            checkInputElement(inputItem, formElement, config)
        })
    })
}

function enableValidation(config) { // 
    const forms = document.querySelectorAll(config.formSelector);
    [...forms].forEach((formItem) => {
        setEventLisneter(formItem, config);
    });
}

const configFormSelector = {
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__button-save',
    disableButtonClass: 'form__button-save_invalid',
    errorInputClass: 'form__field_status_invalid'
}

enableValidation(configFormSelector)