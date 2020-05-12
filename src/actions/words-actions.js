import {CLEAR_WORDS, SET_WORDS} from './action-types';

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

const addWord = (data) => {
   return (dispatch, {getFirebase, getFirestore}) => {
   };
};

export {
   addWord,
   clearWords
};
