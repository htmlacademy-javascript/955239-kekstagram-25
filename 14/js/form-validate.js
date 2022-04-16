import { photos, rerender } from './pictures.js';
import {imageUploadForm, closeImgUploadPopup, uploadFile } from './uploadNewImage.js';
import '../pristine/pristine.min.js';
import {sendData} from './api.js';
import {body} from './utils.js';

const HASHTAG_MAX_COUNT = 5;
const MAX_LENGTH_COMMENT = 140;
const imgSubmitButton = document.querySelector('.img-upload__submit');

const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMessageModal = (message, classType) => {
  body.append(message);

  const buttonMessage = message.querySelector(`.${classType}__button`);

  buttonMessage.addEventListener('click', () => {
    message.remove();
  });


  document.addEventListener('click', (evt) => {
    const inner = message.querySelector(`.${classType}__inner`);
    const click = evt.composedPath().includes(inner);
    if (!click) {
      message.remove();
    }
  });
};

const onSuccess = () => {
  photos.push({url: uploadFile, comments: [], likes: 0});
  closeImgUploadPopup();
  showMessageModal(messageSuccessTemplate, 'success');
  rerender();
};

const onFail = () => {
  closeImgUploadPopup();
  showMessageModal(messageErrorTemplate, 'error');
};


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

const commentLengthCheck = (value) => value.length <= MAX_LENGTH_COMMENT;
pristine.addValidator(document.querySelector('[name="description"]'), commentLengthCheck, 'не больше 140 символов');


imageUploadForm .addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(!pristine.validate()) {
    return;
  }
  imgSubmitButton.disabled=true;
  sendData(onSuccess, onFail, new FormData(evt.target));
  imageUploadForm.disabled=false;
});

document.addEventListener('keyup', () => {
  imgSubmitButton.disabled = !pristine.validate();
});

export {pristine, MAX_LENGTH_COMMENT, imgSubmitButton, onFail};

