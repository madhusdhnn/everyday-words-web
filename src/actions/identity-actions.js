import {CLEAR_IDENTITY, SET_IDENTITY} from './action-types';
import {hideSpinner, showSpinner} from './spinner-actions';

const setIdentity = (data) => {
   return {
      type: SET_IDENTITY,
      data: data
   };
};

const clearIdentity = () => {
   return {
      type: CLEAR_IDENTITY
   };
};

const register = (data) => {
   return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      dispatch(showSpinner());
      firebase.auth()
         .createUserWithEmailAndPassword(data.email, data.password)
         .then(response => {
            dispatch(hideSpinner());
            return firestore.collection('users')
               .doc(response.user.uid)
               .set({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  initials: `${data.firstName[0].toUpperCase()}${data.lastName[0].toUpperCase()}`
               });
         })
         .then(() => dispatch(setIdentity({})))
         .catch(err => {
            dispatch(hideSpinner());
            dispatch(setIdentity(err));
         });
   };
};

const login = (credentials) => {
   return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      dispatch(showSpinner());
      firebase.auth()
         .signInWithEmailAndPassword(credentials.email, credentials.password)
         .then(() => dispatch(hideSpinner()))
         .then(() => dispatch(setIdentity({})))
         .catch(err => {
            dispatch(hideSpinner());
            dispatch(setIdentity(err));
         });
   };
};

const signOut = () => {
   return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      dispatch(showSpinner());
      firebase.auth()
         .signOut()
         .then(() => dispatch(hideSpinner()))
         .catch(() => dispatch(hideSpinner()))
         .finally(() => dispatch(clearIdentity()));
   };
};

export {register, login, signOut, clearIdentity};
