import {showHandlerBigPicture} from './galery.js';
import { getData } from './api.js';
import { getNRandomObjectsFromArray, debounce } from './utils.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const buttons = document.querySelectorAll('.img-filters__button');
const buttonsForm = document.querySelector('.img-filters__form');

let photos = [];

const deactivateButtons = () => buttons.forEach((button) => {
  button.classList.remove('img-filters__button--active');
});

const activateButtonById = (id) => {
  buttons.forEach((button) => {
    button.classList.add(button.id === id && 'img-filters__button--active');
  });
};

const renderPictures = (pictures) => {
  const shownPictures = pictureContainer.querySelectorAll('.picture');
  shownPictures.forEach((pic) => {
    pictureContainer.removeChild(pic);
  });
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const {url,comments, likes} = picture;
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    pictureItem.addEventListener('click', ()=> showHandlerBigPicture(picture));
    fragment.appendChild(pictureItem);
  });
  pictureContainer.appendChild(fragment);
};


const onFilterClick = (id) => {
  deactivateButtons();
  activateButtonById(id);
  switch (id) {
    case 'filter-default':
      return renderPictures(photos);
    case 'filter-random':
      return renderPictures(getNRandomObjectsFromArray(photos,10));
    case 'filter-discussed':
      return renderPictures(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
  }
};

const refreshPhotos = () => {
  const activeButton = Array.from(buttons).filter((button) => button.classList.contains('img-filters__button--active'));
  onFilterClick(activeButton.length === 1 && activeButton[0].id);
};

buttonsForm.addEventListener('click', (evt) => debounce(onFilterClick, 500)(evt.target.id));

const onSuccess = (pictures) => {
  photos = pictures;
  const imgFilter = document.querySelector('.img-filters--inactive');
  imgFilter.classList.remove('img-filters--inactive');
  imgFilter.classList.add('img-filters--active');
  renderPictures(pictures);
  activateButtonById('filter-default');
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

getData(onSuccess, onFail);


export { photos, refreshPhotos};
