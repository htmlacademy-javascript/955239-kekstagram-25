import {createRandomPhotoWithId} from './photos.js';

const SIMILAR_ENTITY_COUNT = 25;

function similarEntity () {
  return Array.from({length: SIMILAR_ENTITY_COUNT}, (_,idx) => createRandomPhotoWithId(idx+1));
}

export {similarEntity};
