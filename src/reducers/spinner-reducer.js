import {HIDE_SPINNER, SHOW_SPINNER} from '../actions/action-types';

const spinnerReducer = (state = {open: false}, action) => {
   switch (action.type) {
   case SHOW_SPINNER:
      return {open: true};
   case HIDE_SPINNER:
      return {open: false};
   default:
      return state;
   }
};

export default spinnerReducer;
