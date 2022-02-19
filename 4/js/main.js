// официальный сайт https://developer.mozilla.org/ru/docs/Learn
function getRandomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNumber();


function lengthCheck(inspectedString, maxLength) {
  if (inspectedString.length <= maxLength) {
    return true;
  }
  return false;
}

lengthCheck();
