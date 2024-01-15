const generateBigPic = (el, photo) => {

  const pictureContainer = document.querySelector('.big-picture');
  const imageContainer = document.querySelector('.big-picture__img');
  const image = imageContainer.querySelector('img');
  const likes = document.querySelector('.likes-count');
  const commentsCount = pictureContainer.querySelector('.comments-count');
  const comments = pictureContainer.querySelector('.social__comments');
  const description = document.querySelector('.social__caption');
  const commentTemplate = document.querySelector('#comment').content;
  const socialCommentCount = pictureContainer.querySelector('.social__comment-count');
  const commentLoader = pictureContainer.querySelector('.comments-loader');

  pictureContainer.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
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
  document.body.classList.add('modal-open');

  //comments handler
  const commentsNode = [...pictureContainer.querySelectorAll('.social__comment')];
  commentsNode.forEach(comment => comment.classList.add('hidden'));

  const showFiveComments = (arr) => {
    for(let i = 0; i < 5; i++){
      arr[i].classList.remove('hidden');
    }
  }

  showFiveComments(commentsNode);
  const visibleComments = commentsNode.filter(el => !el.classList.contains('hidden'));
  socialCommentCount.querySelector('.comments-count__visible').textContent = visibleComments.length;
  
  commentLoader.addEventListener('click', () => {
    const hiddenComments = commentsNode.filter(el => el.classList.contains('hidden'));
    if(hiddenComments.length > 5){
      showFiveComments(hiddenComments)
    } else {
      hiddenComments.forEach(comment => comment.classList.remove('hidden'));
      commentLoader.classList.add('hidden');
    }
    const visibleComments = commentsNode.filter(el => !el.classList.contains('hidden'));
    socialCommentCount.querySelector('.comments-count__visible').textContent = visibleComments.length;
  })


  //close handler
  const closeBtn = document.querySelector('#picture-cancel');
  const closeHandler = () => {
    pictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    comments.innerHTML = '';
  };

  const closeHandlerOnEsc = (e) => {
    if(e.key === 'Escape') {
      closeHandler();
    }
  }

  closeBtn.addEventListener('click', closeHandler);
  document.addEventListener('keydown', closeHandlerOnEsc);
};

export { generateBigPic };
