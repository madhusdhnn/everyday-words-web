import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import {getFirebase} from 'react-redux-firebase';
import {getFirestore, reduxFirestore} from 'redux-firestore';
import firebase from './configs/firebase-config';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
   rootReducer,
   composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
      reduxFirestore(firebase)
   )
);

export default Store;
