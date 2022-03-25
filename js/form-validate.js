import './pictures.js';
import {imageUploadForm } from './uploadNewImage.js';
import '../pristine/pristine.min.js';

const HASHTAG_MAX_COUNT = 5;
const maxLengthComment = 140;
const imgSubmitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imageUploadForm , {
  classTo: 'text-item',
  errorClass: 'text-item--invalid',
  successClass: 'text-item--valid',
  errorTextParent: 'text-item',
  errorTextTag: 'span',
  errorTextClass: 'text__error',
});

const hashtagsCommentValidate = (value) => {
  const regularExpressionFragment = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.split(/\s/);
  if(hashtags.length > HASHTAG_MAX_COUNT) {
    return false;
  }
  return hashtags.every((hashtag) => regularExpressionFragment.test(hashtag));
};
pristine.addValidator(document.querySelector('[name="hashtags"]'), hashtagsCommentValidate, 'xэш-тег начинается с символа #, не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;,не может состоять только из одной #,максимальная длина одного хэш-тега 20 символов, включая решётку,нечувствительны к регистру,разделяются пробелами,один и тот же хэш-тег не может быть использован дважды;,нельзя указать больше пяти хэш-тегов;');

const commentLengthCheck = (value) => value.length <= maxLengthComment;
pristine.addValidator(document.querySelector('[name="description"]'), commentLengthCheck, 'не больше 140 символов');

imageUploadForm .addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

document.addEventListener('keyup', () => {
  if (pristine.validate()){
    imgSubmitButton.disabled = false;
  }else{
    imgSubmitButton.disabled = true;
  }
});

export {pristine, maxLengthComment};

