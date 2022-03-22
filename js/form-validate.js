import './pictures.js';
import {imageUploadForm } from './uploadNewImage.js';
import '../pristine/pristine.min.js';

const HASHTAG_MAX_COUNT = 5;
const maxLengthComment = 140;

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
pristine.addValidator(document.querySelector('[name="hashtags"]'), hashtagsCommentValidate, 'errorsMesage');

const commentLengthCheck = (value) => value.length <= maxLengthComment;
pristine.addValidator(document.querySelector('[name="description"]'), commentLengthCheck, 'commentError');

imageUploadForm .addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

export {pristine, maxLengthComment};

