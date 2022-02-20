function getRandomNumber (min, max) {
  if (min > max || min < 0) {
    throw new Error('неприемлемый ввод');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
getRandomNumber();


function isStringAccepted(inspectedString, maxLength) {
  if (inspectedString.length <= maxLength) {
    return true;
  }
  return false;
}
isStringAccepted();
