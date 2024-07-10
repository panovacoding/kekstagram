import { validateForm } from './validateForm.js';

const form = document.querySelector('.img-upload__overlay');
const formNode = document.querySelector('#upload-select-image');
const imageUploader = document.querySelector('#upload-file');
const formClose = form.querySelector('#upload-cancel');
const inputHashtags = form.querySelector('.text__hashtags');
const inputDescription = form.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview img');
const thumbs = document.querySelectorAll('.effects__preview');

const closeHandler = () => {
  form.classList.add('hidden');
  imageUploader.value = '';
  document.body.classList.remove('modal-open');
};

imageUploader.addEventListener('change', (e) => {
  const newLink = window.URL.createObjectURL(e.target.files[0]);
  if (!imageUploader.value) {
    return;
  }
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
  preview.src = newLink;
  thumbs.forEach((thumb) => {
    thumb.style.backgroundImage = `url(${newLink})`;
  });
});
document.addEventListener('keydown', (e) => {
  if ( document.activeElement == inputHashtags || document.activeElement == inputDescription) {
    return;
  }
  if (e.key === 'Escape') {
    closeHandler();
  }
});
formClose.addEventListener('click', closeHandler);

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content;
  const message = template.cloneNode(true);
  const closeMessageButton = document.querySelector('.success__button');
  console.log(closeMessageButton)

  document.body.appendChild(message);

  const closeMessage = () => {
    message.classList.add('hidden');
  };
  closeMessageButton.addEventListener('click', closeMessage);

};

formNode.addEventListener('submit', (e) => {
  e.preventDefault();
  const isFormValid = validateForm(inputHashtags);
  if(!isFormValid) { return; }

  fetch('https://25.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: new FormData(formNode),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(`${res.status}`);
    })
    .then((res) => {
      formNode.reset();
      form.classList.add('hidden');
      showSuccessMessage();
    })
    .catch((err) => console.log(err));
});
