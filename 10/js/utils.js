const getRandomNumber = (min, max) => {
  if (min > max || min < 0) {
    throw new Error('неприемлемый ввод');
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

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

const addEscapeListener = (action) => document.addEventListener('keydown', (evt) => handleEscape(evt, action));

const removeEscapeListener = () => document.removeEventListener('keydown', handleEscape);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomArrayElement, isStringAccepted, addEscapeListener, removeEscapeListener};
