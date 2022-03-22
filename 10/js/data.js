import {createRandomPhotoWithId} from './photos.js';

const SIMILAR_ENTITY_COUNT = 25;

const formsSimilarEntity = () => Array.from({length: SIMILAR_ENTITY_COUNT}, (_,idx) => createRandomPhotoWithId(idx+1));

export {formsSimilarEntity};
