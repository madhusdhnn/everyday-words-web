import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {ExitToApp} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../../actions/identity-actions';
import compose from 'recompose/compose';

const styles = {
   root: {
      flexGrow: 1
   },
   title: {
      flexGrow: 1
   }
};

class NavBar extends Component {
   constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
   }

   handleClick() {
      this.props.logout();
   }

   render() {
      const {classes} = this.props;
      return (
         <div className={classes.root}>
            <AppBar position="static">
               <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                     Everyday Words
                  </Typography>
                  <Tooltip title="Log Out" aria-label="Log Out">
                     <IconButton aria-label="log out" color="inherit" onClick={this.handleClick}>
                        <ExitToApp />
                     </IconButton>
                  </Tooltip>
               </Toolbar>
            </AppBar>
         </div>
      );
   }
}

NavBar.propTypes = {
   logout: PropTypes.func
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({logout}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'NavBar'
   }),
   connect(null, mapDispatchToProps)
)
(NavBar);
