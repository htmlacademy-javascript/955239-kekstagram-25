import { showElement, hideElement } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const loaderComments = bigPicture.querySelector('.social__comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPicturesCancel= bigPicture.querySelector('.big-picture__cancel');

const createCommentItem = (comment) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const image = document.createElement('img');
  image.classList.add('social__picture');
  image.src=`${comment.avatar}`;
  image.alt=`${comment.nameusers}`;
  image.width=35;
  image.height=35;
  commentItem.appendChild(image);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent=`${comment.message}`;
  commentItem.appendChild(commentText);

  return commentItem;
};

const commentsFragment = document.createDocumentFragment();

const showHandlerBigPicture = (picture) => {
  const commentsAppendClickHandler = () => {
    picture.comments.slice(commentsContainer.childElementCount, commentsContainer.childElementCount+5)
      .forEach((comment) => commentsFragment.appendChild(createCommentItem(comment)));
    commentsContainer.appendChild(commentsFragment);
    socialCommentCount.textContent=`${commentsContainer.childElementCount} из ${picture.comments.length} комментариев`;
    if (picture.comments.length === commentsContainer.childElementCount){
      loaderComments.classList.add('hidden');
    }else{
      loaderComments.classList.remove('hidden');
    }
  };

  const imgHideHandler = (evt) => {
    if (evt.type === 'click' || (evt.type === 'keydown' && evt.key === 'Escape')) {
      hideElement(bigPicture);
      commentsContainer.innerHTML = '';
      bigPicturesCancel.removeEventListener('click', imgHideHandler);
      loaderComments.removeEventListener('click', commentsAppendClickHandler);
      document.removeEventListener('keydown', imgHideHandler);
    }
  };

  bigPicturesCancel.addEventListener('click', imgHideHandler);
  loaderComments.addEventListener('click', commentsAppendClickHandler);
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.id;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  commentsAppendClickHandler();

  showElement(bigPicture);

  document.addEventListener('keydown', imgHideHandler);
};

export {showHandlerBigPicture, bigPicture};
