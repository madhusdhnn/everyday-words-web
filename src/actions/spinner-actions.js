import {HIDE_SPINNER, SHOW_SPINNER} from './action-types';

const showSpinner = () => {
   return {
      type: SHOW_SPINNER
   };
};

const hideSpinner = () => {
   return {
      type: HIDE_SPINNER
   };
};

export {showSpinner, hideSpinner};
