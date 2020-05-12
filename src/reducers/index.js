import {combineReducers} from 'redux';
import loader from './loader-reducer';
import snackbarReducer from './snackbar-reducer';
import wordsReducer from './words-reducer';

const rootReducer = combineReducers({
   loader,
   snackbar: snackbarReducer,
   words: wordsReducer
});

export default rootReducer;
