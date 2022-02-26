function getRandomNumber (min, max) {
  if (min > max || min < 0) {
    throw new Error('неприемлемый ввод');
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

function isStringAccepted(inspectedString, maxLength) {
  if (inspectedString.length <= maxLength) {
    return true;
  }
  return false;
}
isStringAccepted();

function getRandomArrayElement(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
}

const DESCRIPTIONS_PHOTOS = [
  'Великолепный вид',
  'Интиресный фэйс',
  'Скромно и со вкусом',
  'Довольно вызывающе',
];

const NAMES_USERS = [
  'Валерия',
  'Инна',
  'Сергей',
  'Матвей',
  'Глеб',
  'Карина',
  'Фадей',
];

const MESSAGES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_ENTITY_COUNT = 25;

function createRandomComment() {
  return {
    id: getRandomNumber(1, 25),
    avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES_COMMENTS),
    nameusers: getRandomArrayElement(NAMES_USERS),
  };
}

function createRandomPhotoWithId(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTOS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1,10)}, createRandomComment),
  };
}

const similarEntity = Array.from({length: SIMILAR_ENTITY_COUNT}, (_,idx) => createRandomPhotoWithId(idx+1));
similarEntity();
