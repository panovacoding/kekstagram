/* eslint-disable no-console */

const validateForm = () => {
  const form = document.querySelector('.img-upload__overlay');
  const imageUploader = document.querySelector('#upload-file');
  const formClose = form.querySelector('#upload-cancel');

  const inputHashtags = form.querySelector('.text__hashtags');
  const inputDescription = form.querySelector('.text__description');

  imageUploader.addEventListener('change', () => {
    if(!imageUploader.value) { return; }
    form.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  const closeHandler = () => {
    form.classList.add('hidden');
    imageUploader.value = '';
    document.body.classList.remove('modal-open');
  };

  formClose.addEventListener('click', closeHandler);
  document.addEventListener('keydown', (e) => {
    if(document.activeElement == inputHashtags || document.activeElement == inputDescription) { return; }
    if(e.key === 'Escape') { closeHandler(); }
  });

  const formNode = document.querySelector('#upload-select-image');
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  formNode.addEventListener('submit', (e) => {
    e.preventDefault();

    if(inputHashtags.value){
      const hashtags = inputHashtags.value.split(' ');
      
      const isValid = hashtags.every(el => re.test(el));
      !isValid ? inputHashtags.style.background = 'red' : inputHashtags.style.background = 'green';
    
    }
  })
};

validateForm();

export { validateForm };
