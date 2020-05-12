import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';
import Store from './store';
import firebase from './configs/firebase-config';
import App from './App';
import Routes from './components/Routes';

const rrfConfig = {
   userProfile: 'users',
   useFirestoreForProfile: true
};

const rrfProps = {
   firebase,
   config: rrfConfig,
   dispatch: Store.dispatch
};

ReactDOM.render(
   <Provider store={Store}>
      <ReactReduxFirebaseProvider {...rrfProps} createFirestoreInstance={createFirestoreInstance}>
         <Router>
            <App>
               <Routes />
            </App>
         </Router>
      </ReactReduxFirebaseProvider>
   </Provider>,
   document.getElementById('root')
);

serviceWorker.unregister();
