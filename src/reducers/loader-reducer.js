import {HIDE_SPINNER, SHOW_SPINNER} from '../actions/action-types';

const loader = (state = {isLoading: false}, action) => {
   switch (action.type) {
   case SHOW_SPINNER:
      return {isLoading: true};
   case HIDE_SPINNER:
      return {isLoading: false};
   default:
      return state;
   }
};

export default loader;
