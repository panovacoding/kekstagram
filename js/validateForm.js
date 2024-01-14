/* eslint-disable no-console */
import './../pristine/pristine.min.js';

const validateForm = () => {
  const form = document.querySelector('.img-upload__overlay');
  const imageUploader = document.querySelector('#upload-file');
  const formClose = form.querySelector('#upload-cancel');

  const inputHashtags = form.querySelector('.text__hashtags');
  const inputDescription = form.querySelector('.text__description');

  imageUploader.addEventListener('change', () => {
    if(!imageUploader.value) { return; }
    form.classList.remove('hidden');
  });

  const closeHandler = () => {
    form.classList.add('hidden');
    imageUploader.value = '';
  };

  formClose.addEventListener('click', closeHandler);
  document.addEventListener('keydown', (e) => {
    if(document.activeElement == inputHashtags || document.activeElement == inputDescription) { return; }
    if(e.key === 'Escape') { closeHandler(); }
  });

  const formNode = document.querySelector('#upload-select-image');
  const hashtagRegEx = new RegExp(/^[а-яёА-ЯЁa-zA-Z]\d{1, 19}$/i);

  formNode.addEventListener('submit', (e) => {
    e.preventDefault();

    if(inputHashtags.value.length){
      const splittedHashtags = inputHashtags.value.split(' ');
      const filteredHashtags = splittedHashtags.filter((el) => el[0] === '#');
      if(splittedHashtags.length !== filteredHashtags.length) {
        inputHashtags.style.background = 'red';
      } else {
        inputHashtags.style.background = 'green';
      }

      const tagsWithoutHash = filteredHashtags.map((el) => {
        const arr = el.split('');
        arr.shift();
        return arr.join('');
      });

      const validTags = tagsWithoutHash.filter((el) => {
        el.match(hashtagRegEx);
      });

      console.log(splittedHashtags);
      console.log(validTags);

      if(splittedHashtags.length !== validTags.length){
        inputHashtags.style.background = 'red';
      } else {
        inputHashtags.style.background = 'green';
      }
    }

  });

};

validateForm();

export { validateForm };
