import { data } from './data.js';

const picTemplate = document.querySelector('#picture').content;
const picContainer = document.querySelector('.pictures');

function createOtherPhotos(el) {
  const otherPhotoTemplate = picTemplate.cloneNode(true);
  const otherPhotoImage = otherPhotoTemplate.querySelector('.picture__img');
  otherPhotoImage.src = el.url;
  const otherPhotoLikes = otherPhotoTemplate.querySelector('.picture__likes');
  otherPhotoLikes.textContent = el.likes;
  const otherPhotoComments = otherPhotoTemplate.querySelector('.picture__comments');
  otherPhotoComments.textContent = el.comments.length;
  picContainer.append(otherPhotoTemplate);
}

data.forEach((el) => {
  createOtherPhotos(el);
});
