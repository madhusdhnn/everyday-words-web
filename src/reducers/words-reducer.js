import {CLEAR_IDENTITY, CLEAR_WORDS, SET_IDENTITY, SET_WORDS,} from '../actions/action-types';

const wordsReducer = (state = {}, action) => {
   switch (action.type) {
   /*case UPDATE_IDENTITY:
         return {
            ...state,
            userId: localStorage.getItem('userId')
         };*/
   case SET_IDENTITY:
      return {
         ...state,
         userId: action.data.userId
      };
   case SET_WORDS:
      return {
         ...state,
         words: action.data
      };
   case CLEAR_WORDS:
      return {
         ...state,
         words: null
      };
   case CLEAR_IDENTITY:
      return {};
   default:
      return state;
   }
};

export default wordsReducer;
