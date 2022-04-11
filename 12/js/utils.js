const getRandomNumber = (min, max) => {
  if (min > max || min < 0) {
    throw new Error('неприемлемый ввод');
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

const body = document.querySelector('body');

const isStringAccepted = (inspectedString, maxLength) => {
  if (inspectedString.length <= maxLength) {
    return true;
  }
  return false;
};

const handleEscape = (evt, action) => {
  if(evt.key === 'Escape') {
    action();
    document.removeEventListener('keydown', handleEscape);
  }
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

const addEscapeListener = (action) => document.addEventListener('keydown', (evt) => handleEscape(evt, action));

const removeEscapeListener = () => document.removeEventListener('keydown', handleEscape);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomArrayElement, isStringAccepted, addEscapeListener, removeEscapeListener, showAlert, body};
