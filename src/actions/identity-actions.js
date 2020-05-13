import {CLEAR_IDENTITY, SET_IDENTITY} from './action-types';

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
      firebase.auth()
         .createUserWithEmailAndPassword(data.email, data.password)
         .then(response => {
            return firestore.collection('users')
               .doc(response.user.uid)
               .set({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  initials: `${data.firstName[0].toUpperCase()}${data.lastName[0].toUpperCase()}`
               });
         })
         .then(() => dispatch(setIdentity({})))
         .catch(err => dispatch(setIdentity(err)));
   };
};

const login = (credentials) => {
   return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth()
         .signInWithEmailAndPassword(credentials.email, credentials.password)
         .then(() => dispatch(setIdentity({})))
         .catch(err => dispatch(setIdentity(err)));
   };
};

const logout = () => {
   return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth()
         .signOut()
         .then(() => dispatch(clearIdentity()));
   };
};

export {register, login, logout};
