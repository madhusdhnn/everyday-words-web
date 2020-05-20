import {REMOVE_SNACKBAR, SNACKBAR_ERROR, SNACKBAR_SUCCESS, SNACKBAR_WARNING} from './action-types';

const snackbarWarning = (message, anchorOrigin = {vertical: 'bottom', horizontal: 'left'}) => {
   return {
      type: SNACKBAR_WARNING,
      message: message,
      anchorOrigin: anchorOrigin
   };
};

const snackbarError = (message, anchorOrigin = {vertical: 'bottom', horizontal: 'left'}) => {
   return {
      type: SNACKBAR_ERROR,
      message: message,
      anchorOrigin: anchorOrigin
   };
};

const snackbarNotice = (message, anchorOrigin = {vertical: 'bottom', horizontal: 'left'}) => {
   return {
      type: SNACKBAR_SUCCESS,
      message: message,
      anchorOrigin: anchorOrigin
   };
};

const removeSnackbar = () => {
   return {
      type: REMOVE_SNACKBAR
   };
};

export {snackbarWarning, snackbarError, snackbarNotice, removeSnackbar};
