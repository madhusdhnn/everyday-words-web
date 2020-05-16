import {combineReducers} from 'redux';
import snackbarReducer from './snackbar-reducer';
import wordsReducer from './words-reducer';
import identityReducer from './identity-reducer';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import spinnerReducer from './spinner-reducer';

const rootReducer = combineReducers({
   firebase: firebaseReducer,
   firestore: firestoreReducer,
   identity: identityReducer,
   snackbar: snackbarReducer,
   words: wordsReducer,
   spinner: spinnerReducer
});

export default rootReducer;
