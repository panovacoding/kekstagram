import '/nouislider/nouislider.js';

const setImageSettings = () => {
  const parentNode = document.querySelector('.img-upload');
  const img = parentNode.querySelector('.img-upload__preview img');

  //scale handle
  const imgScale = parentNode.querySelector('.scale');
  const scaleSmall = imgScale.querySelector('.scale__control--smaller');
  const scaleBig = imgScale.querySelector('.scale__control--bigger');
  const scaleValue = imgScale.querySelector('.scale__control--value');

  const scaleHandler = (isSmaller) => {
    const value = scaleValue.value.split('%');


    const scaleSmaller = () => {
      scaleValue.value = `${+value[0] - 25}%`;
      img.style.transform = `scale(0.${+value[0] - 25})`;
    };

    const scaleBigger = () => {
      scaleValue.value = `${+value[0] + 25}%`;
      if (scaleValue.value === '100%') {
        img.style.transform = 'scale(1)';
      } else {
        img.style.transform = `scale(0.${+value[0] + 25})`;
      }
    };

    if (isSmaller && value[0] !== '25') {
      scaleSmaller();
      return;
    }
    if(!isSmaller && value[0] !== '100') {
      scaleBigger();
    }
  };
  const smallerHandler = () => scaleHandler(true);
  const biggerHandler = () => scaleHandler(false);

  scaleSmall.addEventListener('click', smallerHandler);
  scaleBig.addEventListener('click', biggerHandler);

  //effects handle

  const effectslist = parentNode.querySelector('.effects__list');
  const effects = [...parentNode.querySelectorAll('input[name="effect"]')];
  const effectValue = parentNode.querySelector('.effect-level__value');
  const sliderElement = document.querySelector('.effect-level__slider');

  const sliderDefaultSettings = {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };

  const sliderMarvinSettings = {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  };

  const sliderPhobosSettings = {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  };

  const sliderHeatSettings = {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  };

  const sliderFloatSettings = {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  };

  noUiSlider.create(sliderElement, sliderDefaultSettings);

  effectslist.addEventListener('change', () => {
    const checkedIndex = effects.findIndex((el) => el.checked);
    img.className = '';
    const checkedEffect = effects[checkedIndex].value;
    if (checkedEffect !== 'none') {
      img.classList.add(`effects__preview--${effects[checkedIndex].value}`);
      sliderElement.classList.remove('hidden');
    } else {
      sliderElement.classList.add('hidden');
      img.style.filter = 'none';
    }
    switch (checkedEffect) {
      case 'marvin':
        sliderElement.noUiSlider.updateOptions(sliderMarvinSettings);
        break;
      case 'phobos':
        sliderElement.noUiSlider.updateOptions(sliderPhobosSettings);
        break;
      case 'heat':
        sliderElement.noUiSlider.updateOptions(sliderHeatSettings);
        break;
      case 'chrome':
        sliderElement.noUiSlider.updateOptions(sliderFloatSettings);
        break;
      case 'sepia':
        sliderElement.noUiSlider.updateOptions(sliderFloatSettings);
        break;
      default:
        break;
    }
  });
  sliderElement.noUiSlider.on('update', () => {
    const checkedIndex = effects.findIndex((el) => el.checked);
    const checkedEffect = effects[checkedIndex].value;

    const currentSliderValue = sliderElement.noUiSlider.get();

    if (checkedEffect !== 'none') {
      effectValue.value = currentSliderValue;
    }

    switch (checkedEffect) {
      case 'chrome': {
        img.style.filter = `grayscale(${currentSliderValue})`;
        break;
      }
      case 'sepia': {
        img.style.filter = `sepia(${currentSliderValue})`;
        break;
      }
      case 'marvin': {
        img.style.filter = `invert(${currentSliderValue}%)`;
        break;
      }
      case 'phobos': {
        img.style.filter = `blur(${currentSliderValue}px)`;
        break;
      }
      case 'heat': {
        img.style.filter = `brightness(${currentSliderValue})`;
        break;
      }
      default:
        break;
    }
  });
};

setImageSettings();

export { setImageSettings };
