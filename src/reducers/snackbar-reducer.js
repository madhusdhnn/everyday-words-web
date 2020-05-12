import {SNACKBAR_ERROR, SNACKBAR_WARNING, SNACKBAR_SUCCESS, REMOVE_SNACKBAR} from '../actions/action-types';

const snackbarReducer = (state = {open: false}, action) => {
   switch (action.type) {
   case SNACKBAR_ERROR:
      return {
         ...state,
         message: action.message,
         type: 'error',
         open: true
      };
   case SNACKBAR_WARNING:
      return {
         ...state,
         message: action.message,
         type: 'warning',
         open: true
      };
   case SNACKBAR_SUCCESS:
      return {
         ...state,
         message: action.message,
         type: 'success',
         open: true
      };
   case REMOVE_SNACKBAR:
      return {open: false};
   default:
      return state;
   }
};

export default snackbarReducer;
