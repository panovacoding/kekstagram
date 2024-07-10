const validateForm = (hashtags) => {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if(hashtags.value){
    const userHashtags = hashtags.value.split(' ');
    const isValid = userHashtags.every((el) => re.test(el));
    if(isValid) {
      hashtags.style.background = 'green';
      return true;
    } else {
      hashtags.style.background = 'red';
      return false;
    }
  }
};

export { validateForm };
