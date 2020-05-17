import {SET_WORD_ERROR} from './action-types';
import {hideSpinner, showSpinner} from './spinner-actions';

const clearWord = (err) => {
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
         .catch(err => {
            dispatch(hideSpinner());
            dispatch(clearWord(err));
         });

   };
};

export {
   addWord
};
