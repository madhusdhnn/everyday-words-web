import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Root from './layouts/Root';

class Routes extends Component {

   render() {
      return (
         <Switch>
            <Route exact path="/words/dashboard" component={Root} />
            <Redirect from="/words" exact to="/words/dashboard" />
            <Redirect from="/" exact to="/words/dashboard" />
            <Redirect from="*" exact to="/words/dashboard" />
         </Switch>
      );
   }

}

export default withRouter(Routes);
