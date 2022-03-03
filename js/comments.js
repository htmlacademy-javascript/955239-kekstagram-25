import {getRandomNumber, getRandomArrayElement} from './utils.js';

const NAMES_USERS = [
  'Валерия',
  'Инна',
  'Сергей',
  'Матвей',
  'Глеб',
  'Карина',
  'Фадей',
];

const OPTION_NUMBER = 200;

const MESSAGES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function createRandomComment() {
  return {
    id: getRandomNumber(1, OPTION_NUMBER),
    avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES_COMMENTS),
    nameusers: getRandomArrayElement(NAMES_USERS),
  };
}

export {createRandomComment, MESSAGES_COMMENTS, NAMES_USERS};
