import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {IconButton, Snackbar, Slide, withStyles} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import {removeSnackbar} from '../../actions/snackbar-actions';
import compose from 'recompose/compose';

const styles = theme => ({
   snackbar: {
      bottom: 50,
      [theme.breakpoints.down('xs')]: {
         bottom: 90
      }
   }
});

class SnackBar extends Component {
   constructor(props) {
      super(props);
      this.handleClose = this.handleClose.bind(this);
      this.slideTransition = this.slideTransition.bind(this);
   }

   handleClose() {
      this.props.removeSnackbar();
   }

   slideTransition(props) {
      return (<Slide {...props} direction="up" />);
   }

   render() {
      const {classes, snackbar} = this.props;
      return (
         <div>
            <Snackbar
               open={snackbar.open}
               message={snackbar.message}
               autoHideDuration={6000}
               disableWindowBlurListener
               onClose={this.handleClose}
               className={classes.snackbar}
               TransitionComponent={this.slideTransition}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
               }}
               action={
                  <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                     <CloseIcon fontSize="small" />
                  </IconButton>
               }
            />
         </div>
      );
   }
}

const mapStateToProps = state => {
   const {snackbar} = state;
   return {snackbar};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({removeSnackbar}, dispatch);
};

SnackBar.propTypes = {
   snackbar: PropTypes.object,
   removeSnackbar: PropTypes.func
};

export default compose(
   withStyles(styles, {
      name: 'SnackBar'
   }),
   connect(mapStateToProps, mapDispatchToProps)
)(SnackBar);
