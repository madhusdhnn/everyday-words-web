import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Add, ExitToApp} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import {addWord} from '../../actions/words-actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../../actions/identity-actions';
import compose from 'recompose/compose';
import ElevationScroll from './ElevationScroll';
import AddNewWordDialog from '../containers/AddNewWordDialog';

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
      this.state = {
         openNewWordDialog: false
      };
      this.openDialog = this.openDialog.bind(this);
      this.signOut = this.signOut.bind(this);
   }

   openDialog() {
      this.setState({
         openNewWordDialog: true
      });
   }

   closeDialog = () => {
      const that = this;
      that.setState({
         openNewWordDialog: false
      });
   }

   addWord = (data) => {
      const that = this;
      that.closeDialog();
      that.props.addWord(data);
   }

   signOut() {
      this.props.signOut();
   }

   render() {
      const {classes} = this.props;
      return (
         <div className={classes.root}>
            <CssBaseline />
            <ElevationScroll {...this.props}>
               <AppBar>
                  <Toolbar>
                     <Typography variant="h6" className={classes.title}>
                        Everyday Words
                     </Typography>
                     <Tooltip title="Add Word" aria-label="Add Word">
                        <IconButton aria-label="add word" color="inherit" onClick={this.openDialog}>
                           <Add />
                        </IconButton>
                     </Tooltip>
                     <Tooltip title="Log Out" aria-label="Log Out">
                        <IconButton aria-label="log out" color="inherit" onClick={this.signOut}>
                           <ExitToApp />
                        </IconButton>
                     </Tooltip>
                  </Toolbar>
               </AppBar>
            </ElevationScroll>
            <Toolbar />
            <AddNewWordDialog
               open={this.state.openNewWordDialog}
               close={this.closeDialog}
               addWord={this.addWord}
            />
         </div>
      );
   }
}

NavBar.propTypes = {
   signOut: PropTypes.func,
   addWord: PropTypes.func
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({addWord, signOut}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'NavBar'
   }),
   connect(null, mapDispatchToProps)
)
(NavBar);
