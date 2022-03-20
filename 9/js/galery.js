import './comments.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const loaderComments = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPicturesCancel= bigPicture.querySelector('.big-picture__cancel');

const commentsFragment = document.createDocumentFragment();

const createCommentItem = (comment) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  commentItem.innerHTML = `<img
    class="social__picture"
    src="img/${comment.avatar}"
    alt="${comment.nameusers}"
    width="35" height="35">
  <p class="social__text">${comment.message}</p>`;
  return commentItem;
};

const hideBigPicture = () => {
  socialCommentCount.classList.remove('hidden');
  loaderComments.classList.remove('hidden');

  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsContainer.innerHTML = '';
};

bigPicturesCancel.addEventListener('click', hideBigPicture);

const showBigPicture = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.id;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  picture.comments.forEach((comment) => commentsFragment.appendChild(createCommentItem(comment)));

  socialCommentCount.classList.add('hidden');
  loaderComments.classList.add('hidden');

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  commentsContainer.appendChild(commentsFragment);

  const handleEscape = (evt) => {
    if(evt.key === 'Escape') {
      hideBigPicture();
      document.removeEventListener('keydown', handleEscape);
    }
  };

  document.addEventListener('keydown', handleEscape);
};

export {showBigPicture, bigPicture, commentsContainer, commentTemplate, loaderComments, socialCommentCount, commentsFragment};
