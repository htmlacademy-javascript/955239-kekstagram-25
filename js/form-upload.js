/*import {pristine} from './form-validate.js';
import {showAlert} from './utils.js';
import {sendData} from './api.js';

const imgSubmitButton = document.querySelector('.img-upload__submit');
const imageContainer = document.querySelector('.img-upload');
const imageUploadForm = imageContainer.querySelector('.img-upload__form');

const setUserFormSubmit = (onSuccess) => {
  imageUploadForm .addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => onSuccess(),
        () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
        new FormData(evt.target),
      );
    }
  });
};
document.addEventListener('keyup', () => {
  imgSubmitButton.disabled = !pristine.validate();//(evt.preventDefault())
});

export {setUserFormSubmit, imageUploadForm};*/
