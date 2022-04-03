import './comments.js';

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const loaderComments = bigPicture.querySelector('.social__comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPicturesCancel= bigPicture.querySelector('.big-picture__cancel');

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

const commentsFragment = document.createDocumentFragment();

const showBigPicture = (picture) => {
  const appendComments = () => {
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

  const hideBigPicture = () => {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    commentsContainer.innerHTML = '';
    bigPicturesCancel.removeEventListener('click', hideBigPicture);
    loaderComments.removeEventListener('click', appendComments);
  };

  bigPicturesCancel.addEventListener('click', hideBigPicture);
  loaderComments.addEventListener('click', appendComments);
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.id;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  appendComments();

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  const handleEscape = (evt) => {
    if(evt.key === 'Escape') {
      hideBigPicture();
      document.removeEventListener('keydown', handleEscape);
    }
  };

  document.addEventListener('keydown', handleEscape);
};

export {showBigPicture, bigPicture, commentsContainer, commentTemplate, loaderComments, socialCommentCount};
