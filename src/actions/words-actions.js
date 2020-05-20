import {SET_WORD_ERROR} from './action-types';
import {hideSpinner, showSpinner} from './spinner-actions';
import {snackbarNotice} from './snackbar-actions';

const setWordError = (err) => {
   return {
      type: SET_WORD_ERROR,
      err: err
   };
};

const addWord = (data) => {
   return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      const {uid} = getState().firebase.auth;
      dispatch(showSpinner());
      firestore.collection('words')
         .add({
            ...data,
            userId: uid,
            createdAt: new Date()
         })
         .then(() => dispatch(hideSpinner()))
         .then(() => dispatch(snackbarNotice('Added to the list')))
         .catch(err => {
            dispatch(hideSpinner());
            dispatch(setWordError(err));
         });
   };
};

const updateWord = (wordId, data) => {
   return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      const {uid} = getState().firebase.auth;
      dispatch(showSpinner());
      firestore.collection('words')
         .doc(wordId)
         .update({
            ...data,
            userId: uid
         })
         .then(() => dispatch(hideSpinner()))
         .then(() => dispatch(snackbarNotice('Updated successfully')))
         .catch(err => {
            dispatch(hideSpinner());
            dispatch(setWordError(err));
         });
   };
};

const deleteWord = (wordId) => {
   return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      dispatch(showSpinner());
      firestore.collection('words')
         .doc(wordId)
         .delete()
         .then(() => dispatch(hideSpinner()))
         .then(() => dispatch(snackbarNotice('Deleted from the list')))
         .catch(err => {
            dispatch(hideSpinner());
            dispatch(setWordError(err));
         });
   };
};

export {
   addWord,
   updateWord,
   deleteWord
};
