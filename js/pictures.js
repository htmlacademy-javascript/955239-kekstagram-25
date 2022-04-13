import {formsSimilarEntity} from './data.js';
import {showBigPicture} from './galery.js';
import { getData } from './api.js';
//import { onFail } from './form-validate.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picureTemlateRandom = formsSimilarEntity();

const fragment = document.createDocumentFragment();

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    const {url,comments, likes} = picture;
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    pictureItem.addEventListener('click', ()=> showBigPicture(picture));
    fragment.appendChild(pictureItem);
  });
  pictureContainer.appendChild(fragment);
};

const onFail = (message) => {
  const tmp = document.querySelector('#load-error').content.querySelector('.load-error').cloneNode(true);
  tmp.querySelector('h2').innerText = message;
  document.querySelector('body').append(tmp);

  const buttonMessage = tmp.querySelector('.load-error__button');

  buttonMessage.addEventListener('click', () => {
    tmp.remove();
  });


  document.addEventListener('click', (evt) => {
    const inner = tmp.querySelector('.error__inner');
    const click = evt.composedPath().includes(inner);
    if (!click) {
      tmp.remove();
    }
  });
};

getData(renderPictures, onFail);


export {pictureContainer, pictureTemplate, picureTemlateRandom, fragment};
