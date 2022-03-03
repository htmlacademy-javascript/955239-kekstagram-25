import {getRandomNumber, getRandomArrayElement} from './utils.js';
import {createRandomComment} from './comments.js';

const DESCRIPTIONS_PHOTOS = [
  'Великолепный вид',
  'Интиресный фэйс',
  'Скромно и со вкусом',
  'Довольно вызывающе',
];

function createRandomPhotoWithId(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTOS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1,10)}, createRandomComment),
  };
}

export {createRandomPhotoWithId};
