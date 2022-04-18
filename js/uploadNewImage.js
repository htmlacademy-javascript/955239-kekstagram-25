import './galery.js';
import { pristine } from './form-validate.js';
import { setDefaultScale, removeEffect } from './form-effect.js';
import {imgSubmitButton} from './form-validate.js';
import { showElement, hideElement }from './utils.js';

const imageContainer = document.querySelector('.img-upload');
const imageUploadForm = imageContainer.querySelector('.img-upload__form');
const imgPopupUpload = document.querySelector('.img-upload__overlay');
const imgUploadButton = document.querySelector('#upload-file');
const tagsForm = document.querySelector('.text__hashtags');
const commentForm = document.querySelector('.text__description');
const previewPhoto = document.querySelector('.img-upload__preview img');
const closeEditButton = document.querySelector('.img-upload__cancel ');

let uploadFile;

const closeImgUploadPopup = () => {
  imageUploadForm.reset();
  hideElement(imgPopupUpload);
};

const escapeHandler = (evt) => {
  if(evt.key === 'Escape') {
    closeImgUploadPopup();
    document.removeEventListener('keydown', escapeHandler);
  }
};

const openImgUploadPopup = () => {
  imgSubmitButton.disabled=false;
  tagsForm.value='';
  commentForm.value='';
  pristine.validate();
  showElement(imgPopupUpload);
  document.addEventListener('keydown', escapeHandler);
  setDefaultScale();
  removeEffect();
};

commentForm.addEventListener('focus', () => {
  document.removeEventListener('keydown', escapeHandler);
});
commentForm.addEventListener('focusout', () => {
  document.addEventListener('keydown', escapeHandler);
});

tagsForm.addEventListener('focus', () => {
  document.removeEventListener('keydown', escapeHandler);
});
tagsForm.addEventListener('focusout', () => {
  document.addEventListener('keydown', escapeHandler);
});

imgUploadButton.addEventListener('change', () => {
  const file = imgUploadButton.files[0];
  if (file) {
    previewPhoto.onload = () => {
      URL.revokeObjectURL(previewPhoto.src);
    };
    uploadFile = URL.createObjectURL(file);
    previewPhoto.src =  URL.createObjectURL(file);
    openImgUploadPopup();
  }
});

closeEditButton.addEventListener('click', () => {
  closeImgUploadPopup();
  document.removeEventListener('keydown', escapeHandler);
});

export { imageUploadForm, closeImgUploadPopup, uploadFile};
