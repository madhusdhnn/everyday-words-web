import {REMOVE_SNACKBAR, SNACKBAR_ERROR, SNACKBAR_SUCCESS, SNACKBAR_WARNING} from '../actions/action-types';

const defaultState = {
   open: false,
   anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
   }
};

const snackbarReducer = (state = defaultState, action) => {
   switch (action.type) {
   case SNACKBAR_ERROR:
      return {
         ...state,
         message: action.message,
         anchorOrigin: action.anchorOrigin,
         type: 'error',
         open: true
      };
   case SNACKBAR_WARNING:
      return {
         ...state,
         message: action.message,
         anchorOrigin: action.anchorOrigin,
         type: 'warning',
         open: true
      };
   case SNACKBAR_SUCCESS:
      return {
         ...state,
         message: action.message,
         anchorOrigin: action.anchorOrigin,
         type: 'success',
         open: true
      };
   case REMOVE_SNACKBAR:
      return defaultState;
   default:
      return state;
   }
};

export default snackbarReducer;
