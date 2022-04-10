import {formsSimilarEntity} from './data.js';
import {showBigPicture} from './galery.js';
import { getData } from './api.js';

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

getData(renderPictures);

/*picureTemlateRandom.forEach((picture) => {
  const {url,comments, likes} = picture;
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.addEventListener('click', ()=> showBigPicture(picture));
  fragment.appendChild(pictureItem);
// })*/

//pictureContainer.appendChild(fragment);

export {pictureContainer, pictureTemplate, picureTemlateRandom, fragment};
