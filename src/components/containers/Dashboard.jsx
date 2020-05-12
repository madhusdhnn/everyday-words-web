import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Copyright from '../layouts/Copyright';

class Dashboard extends Component {
   render() {
      return (
         <div>
            <Typography paragraph variant="h1" align="center">
               Hello World
            </Typography>
            <Copyright />
         </div>
      );
   }
}

export default Dashboard;
