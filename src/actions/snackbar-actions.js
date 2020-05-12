import {SNACKBAR_ERROR, SNACKBAR_WARNING, SNACKBAR_SUCCESS, REMOVE_SNACKBAR} from './action-types';

const snackbarWarning = message => {
   return {
      type: SNACKBAR_WARNING,
      message: message
   };
};

const snackbarError = message => {
   return {
      type: SNACKBAR_ERROR,
      message: message
   };
};

const snackbarNotice = message => {
   return {
      type: SNACKBAR_SUCCESS,
      message: message
   };
};

const removeSnackbar = () => {
   return {
      type: REMOVE_SNACKBAR
   };
};

export {snackbarWarning, snackbarError, snackbarNotice, removeSnackbar};
