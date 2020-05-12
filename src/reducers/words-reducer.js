import {CLEAR_WORDS, SET_WORDS,} from '../actions/action-types';

const wordsReducer = (state = {words: []}, action) => {
   switch (action.type) {
   case SET_WORDS:
      return {
         ...state,
         words: action.data
      };
   case CLEAR_WORDS:
      return {
         ...state,
         words: []
      };
   default:
      return state;
   }
};

export default wordsReducer;
