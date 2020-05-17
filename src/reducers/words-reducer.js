import {SET_WORD_ERROR,} from '../actions/action-types';

const wordsReducer = (state = {}, action) => {
   switch (action.type) {
   case SET_WORD_ERROR:
      return {
         ...state,
         err: action.err
      };
   default:
      return state;
   }
};

export default wordsReducer;
