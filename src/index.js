import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import Store from './store';
import App from './App';
import Routes from './components/Routes';

ReactDOM.render(
   <Provider store={Store}>
      <Router>
         <App>
            <Routes />
         </App>
      </Router>
   </Provider>,
   document.getElementById('root')
);

serviceWorker.unregister();
