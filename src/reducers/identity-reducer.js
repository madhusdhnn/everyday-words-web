import {CLEAR_IDENTITY, SET_IDENTITY} from '../actions/action-types';

const identityReducer = (state = {}, action) => {
   switch (action.type) {
   case SET_IDENTITY:
      return {...action.data};
   case CLEAR_IDENTITY:
      return {};
   default:
      return state;
   }
};

export default identityReducer;
