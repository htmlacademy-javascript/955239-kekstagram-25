const getRandomNumber = (min, max) => {
  if (min > max || min < 0) {
    throw new Error('неприемлемый ввод');
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

const getNRandomObjectsFromArray = (arr, n) => {
  if (n < 1) {
    throw new Error('Ошибка загрузки изображения');
  }
  if (n >= arr.length) {
    return arr;
  }
  const arrCopy = arr.slice();
  const res = [];
  for(let i = 0; i < n; i++){
    res.push(arrCopy.splice(getRandomNumber(0,arrCopy.length),1)[0]);
  }
  return res;
};

const body = document.querySelector('body');

const isStringAccepted = (inspectedString, maxLength) => {
  if (inspectedString.length <= maxLength) {
    return true;
  }
  return false;
};

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

let timeoutId;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const debounce = (callback, timeoutDelay) => (...rest) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
};

const showElement = (element) => {
  document.body.classList.add('modal-open');
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  document.body.classList.remove('modal-open');
  element.classList.add('hidden');
};

export {getRandomNumber, getRandomArrayElement, isStringAccepted, showAlert, body, getNRandomObjectsFromArray, debounce, showElement, hideElement};
