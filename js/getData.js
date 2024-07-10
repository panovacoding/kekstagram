/* eslint-disable no-console */
const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`Произошла ошибка при загрузке фотографий, код ошибки: ${response.status}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => onFail(err));
};


export { getData };
