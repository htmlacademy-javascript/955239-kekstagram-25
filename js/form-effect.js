import './uploadNewImage.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectItems = document.querySelectorAll('.effects__radio');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
});

const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('#preview-image');
const uploadPreviewImg = uploadPreview.querySelector('img');

const MIN_IMG_SCALE = 25;
const MAX_IMG_SCALE = 100;
const IMG_SCALE_STEP = 25;
const DEFAULT_EFFECT_VALUE = 100;

const setScale = (newScale) => {
  controlValue.setAttribute('value', `${newScale}%`);
  uploadPreviewImg.setAttribute('style', `transform: scale(${newScale / 100})`);
};

const imgScaleSmaller = () => {
  const scaleValue = parseInt(controlValue.getAttribute('value'), 10) - IMG_SCALE_STEP;
  if (scaleValue >= MIN_IMG_SCALE) {
    setScale(scaleValue);
  }
};

const imgScaleBigger = () => {
  const scaleValue = parseInt(controlValue.getAttribute('value'), 10) + IMG_SCALE_STEP;
  if (scaleValue <= MAX_IMG_SCALE) {
    setScale(scaleValue);
  }
};

const setDefaultScale = () => setScale(DEFAULT_EFFECT_VALUE);


buttonControlSmaller.addEventListener('click', () => {
  imgScaleSmaller();
});


buttonControlBigger.addEventListener('click', () => {
  imgScaleBigger();
});

effectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const effect = item.getAttribute('value');
    switch (effect) {
      case 'chrome':
      case 'sepia':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });
        sliderElement.classList.remove('hidden');
        if (effect === 'sepia'){
          sliderElement.noUiSlider.on('update', () => {
            uploadPreview.style['-webkit-filter'] = `sepia(${sliderElement.noUiSlider.get()})`;
            uploadPreview.style['filter'] = `sepia(${sliderElement.noUiSlider.get()})`;
          });
        } else {
          sliderElement.noUiSlider.on('update', () => {
            uploadPreview.style['-webkit-filter'] = `grayscale(${sliderElement.noUiSlider.get()})`;
            uploadPreview.style['filter'] = `grayscale(${sliderElement.noUiSlider.get()})`;
          });
        }
        break;
      case 'marvin':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });
        sliderElement.classList.remove('hidden');
        sliderElement.noUiSlider.on('update', () => {
          uploadPreview.style['-webkit-filter'] = `invert(${sliderElement.noUiSlider.get()}%)`;
          uploadPreview.style['filter'] = `invert(${sliderElement.noUiSlider.get()}%)`;
        });
        break;
      case 'phobos':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        sliderElement.classList.remove('hidden');
        sliderElement.noUiSlider.on('update', () => {
          uploadPreview.style['-webkit-filter'] = `blur(${sliderElement.noUiSlider.get()}px)`;
          uploadPreview.style['filter'] = `blur(${sliderElement.noUiSlider.get()}px)`;
        });
        break;
      case 'heat':
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });
        sliderElement.classList.remove('hidden');
        sliderElement.noUiSlider.on('update', () => {
          uploadPreview.style['-webkit-filter'] = `brightness(${sliderElement.noUiSlider.get()})`;
          uploadPreview.style['filter'] = `brightness(${sliderElement.noUiSlider.get()})`;
        });
        break;
      default:
        sliderElement.classList.add('hidden');
        uploadPreview.style = '';
    }
  });
});

const removeEffect = () => {
  effectItems[0].checked=true;
  uploadPreview.classList.value = 'img-upload__preview effects__preview--none';
  sliderElement.classList.add('hidden');
};

export { setDefaultScale, removeEffect };
