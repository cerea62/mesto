import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleFormSubmit, popupSelector }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(popupSelector);
        this._formElement = this._popup.querySelector('.form')
        this._inputList = this._popup.querySelectorAll('.form__field');
        this._submitButton = this._popup.querySelector('.form__button-save')
    }

    close() {
        super.close()
        this._formElement.reset()
    }

    getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setSavingStatus(status) {
        if (status) {
            this._submitButton.textContent = "Сохранение..."
        }
        else {
            this._submitButton.textContent = "Сохранить"
        }
    }

    setEventListeners() {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this.getInputValues());
        });
    }

}