import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
   apiKey: 'AIzaSyBowOZmhbvDRgCP22pFMmEMBILx8McHr0E',
   authDomain: 'everyday-words.firebaseapp.com',
   databaseURL: 'https://everyday-words.firebaseio.com',
   projectId: 'everyday-words',
   storageBucket: 'everyday-words.appspot.com',
   messagingSenderId: '456462985038',
   appId: '1:456462985038:web:09e4fa589abdf1048a201f',
   measurementId: 'G-7SKM9MYE7F'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();

export default firebase;
