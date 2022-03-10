import {formsSimilarEntity} from './data.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picureTemlateRandom = formsSimilarEntity();

const fragment = document.createDocumentFragment();


picureTemlateRandom.forEach(({url,comments,likes}) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  fragment.appendChild(pictureItem);
});

pictureContainer.appendChild(fragment);

export {pictureContainer, pictureTemplate, picureTemlateRandom, fragment};
