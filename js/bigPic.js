const generateBigPic = (el, photo) => {

  const pictureContainer = document.querySelector('.big-picture');
  const imageContainer = document.querySelector('.big-picture__img');
  const image = imageContainer.querySelector('img');
  const likes = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  const comments = document.querySelector('.social__comments');
  const description = document.querySelector('.social__caption');
  const commentTemplate = document.querySelector('#comment').content;
  const socialCommentCount = document.querySelector('.social__comment-count');
  const commentLoader = document.querySelector('.comments-loader');
  pictureContainer.classList.remove('hidden');
  image.src = photo;
  likes.textContent = el.likes;
  commentsCount.textContent = el.comments.length;
  el.comments.map(({ avatar, message, name }) => {
    const comment = commentTemplate.cloneNode(true);
    const commentPic = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');
    commentPic.src = avatar;
    commentPic.setAttribute('alt', name);
    commentText.textContent = message;
    comments.append(comment);
  });
  description.textContent = el.description;
  socialCommentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  const closeBtn = document.querySelector('#picture-cancel');
  const closeHandler = () => {
    pictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    comments.innerHTML = '';
  };

  closeBtn.addEventListener('click', closeHandler);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closeHandler();
    }
  });
};

export { generateBigPic };
