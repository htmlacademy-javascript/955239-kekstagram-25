import './galery.js';
import { pristine } from './form-validate.js';
import { setDefaultScale, removeEffect } from './form-effect.js';

//загрузка нового изображения
const imageContainer = document.querySelector('.img-upload');
const imageUploadWrapper = imageContainer.querySelector('.img-upload__wrapper');
const imageUploadForm = imageContainer.querySelector('.img-upload__form');
const imgPopupUpload = document.querySelector('.img-upload__overlay');//форма редактирования
const imgPopupCloseButton = document.querySelector('#upload-cancel');//кнопка закрыть
const imgUploadButton = document.querySelector('#upload-file');//начальное состояние
const tagsForm = document.querySelector('.text__hashtags');//добавление комментариев и хэш-тегов
const commentForm = document.querySelector('.text__description');//..ваш комментарий
const previewPhoto = document.querySelector('.img-upload__preview img');
const closeEditButton = document.querySelector('.img-upload__cancel ');

const closeImgUploadPopup = () => {
  imgPopupUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const handleEscape = (evt) => {
  if(evt.key === 'Escape') {
    closeImgUploadPopup();
    document.removeEventListener('keydown', handleEscape);
  }
};

const openImgUploadPopup = () => {
  tagsForm.value='';
  commentForm.value='';
  pristine.validate();
  imgPopupUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleEscape);
  setDefaultScale();
  removeEffect();
};

commentForm.addEventListener('focus', () => {
  document.removeEventListener('keydown', handleEscape);
});
commentForm.addEventListener('focusout', () => {
  document.addEventListener('keydown', handleEscape);
});

tagsForm.addEventListener('focus', () => {
  document.removeEventListener('keydown', handleEscape);
});
tagsForm.addEventListener('focusout', () => {
  document.addEventListener('keydown', handleEscape);
});

imgUploadButton.addEventListener('change', () => {
  const file = imgUploadButton.files[0];
  if (file) {
    previewPhoto.onload = () => {
      URL.revokeObjectURL(previewPhoto.src);
    };
    previewPhoto.src = URL.createObjectURL(file);
    openImgUploadPopup();
  }
});

closeEditButton.addEventListener('click', () => {
  closeImgUploadPopup();
  document.removeEventListener('keydown', handleEscape);
});

export {imgPopupUpload, imgPopupCloseButton, imgUploadButton, commentForm, imageUploadForm, imageUploadWrapper, closeImgUploadPopup};
