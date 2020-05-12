import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

const styles = {
   root: {
      flexGrow: 1
   },
   title: {
      flexGrow: 1,
      textAlign: 'center'
   }
};

class NavBar extends Component {
   render() {
      const {classes} = this.props;
      return (
         <div className={classes.root}>
            <AppBar position="static">
               <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                     Everyday Words
                  </Typography>
               </Toolbar>
            </AppBar>
         </div>
      );
   }
}

NavBar.propTypes = {
   classes: PropTypes.object
};

export default withStyles(styles)(NavBar);
