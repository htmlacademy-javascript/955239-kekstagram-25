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

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomArrayElement, isStringAccepted};
