import {CLEAR_IDENTITY, CLEAR_WORDS, SET_IDENTITY, SET_WORDS, UPDATE_IDENTITY} from './action-types';

const setIdentity = (data) => {
   return {
      type: SET_IDENTITY,
      data: data
   };
};

const clearIdentity = () => {
   return {
      type: CLEAR_IDENTITY
   };
};

const updateIdentity = () => {
   return {
      type: UPDATE_IDENTITY
   };
};

const setWords = data => {
   return {
      type: SET_WORDS,
      data: data
   };
};

const clearWords = () => {
   return {
      type: CLEAR_WORDS
   };
};

export {
   clearIdentity,
   clearWords
};
