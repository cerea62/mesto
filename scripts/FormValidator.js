export class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._disableButtonClass = config.disableButtonClass;
        this._errorInputClass = config.errorInputClass;
        this._formElement = formElement;
        this._inputsList = this._formElement.querySelectorAll(this._inputSelector);
        this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showError(inputElement, errorElement) {
        inputElement.classList.add(this._errorInputClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideError(inputElement, errorElement) {
        inputElement.classList.remove(this._errorInputClass);
        errorElement.textContent = '';
    }

    disableButton() { //функция, которая делает кнопку неактивной
        this._submitButtonElement.disabled = 'disabled';
        this._submitButtonElement.classList.add(this._disableButtonClass);
    }

    enableButton() { //функция для активной кнопки
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._disableButtonClass);
    }

    _toggleButtonStatus() {
        if (!this._formElement.checkValidity()) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    };

    _checkInputElement(inputElement) {
        const isInputValid = inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        if (!errorElement) return;
        if (!isInputValid) {
            this._showError(inputElement, errorElement);
        }
        else {
            this._hideError(inputElement, errorElement);
        }
    }
    _setEventListener() {
        this._toggleButtonStatus();

        this._inputsList.forEach((inputItem) => {
            inputItem.addEventListener('input', () => {
                this._toggleButtonStatus();
                this._checkInputElement(inputItem);
            })
        });
    }
    resetError() {
        this._inputsList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
            this._hideError(inputElement, errorElement);
            this._formElement.reset();
        })
    }
    enableValidation() {
        this._setEventListener();
    }
}
