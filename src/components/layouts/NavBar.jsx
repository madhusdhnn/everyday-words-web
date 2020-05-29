import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {Menu, MenuItem} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AccountCircle, Add} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import {addWord} from '../../actions/words-actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../../actions/identity-actions';
import compose from 'recompose/compose';
import ElevationScroll from './ElevationScroll';
import AddNewWordDialog from '../containers/WordDialog';
import {firestoreConnect} from 'react-redux-firebase';

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
         openNewWordDialog: false,
         openProfileMenu: false,
         anchorEl: null
      };
      this.openDialog = this.openDialog.bind(this);
      this.openProfileMenu = this.openProfileMenu.bind(this);
      this.closeProfileMenu = this.closeProfileMenu.bind(this);
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

   openProfileMenu(e) {
      this.setState({
         openProfileMenu: true,
         anchorEl: e.currentTarget
      });
   }

   closeProfileMenu() {
      this.setState({
         openProfileMenu: false,
         anchorEl: null
      });
   }

   addWord = (data) => {
      const that = this;
      that.closeDialog();
      that.props.addWord(data);
   }

   signOut() {
      this.closeProfileMenu();
      this.props.signOut();
   }

   getFullName(user) {
      return `${user.firstName} ${user.lastName}`;
   }

   render() {
      const {classes, auth, users} = this.props;
      const fullName = this.getFullName(users ? users.find(u => u.id === auth.uid) : {});

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
                     <Tooltip title="Profile" aria-label="Profile">
                        <IconButton
                           aria-controls="profile-menu"
                           aria-haspopup="true"
                           aria-label="log out"
                           color="inherit"
                           onClick={this.openProfileMenu}
                        >
                           <AccountCircle />
                        </IconButton>
                     </Tooltip>
                  </Toolbar>
               </AppBar>
            </ElevationScroll>
            <Toolbar />
            {
               this.state.openNewWordDialog && (
                  <AddNewWordDialog
                     open={this.state.openNewWordDialog}
                     close={this.closeDialog}
                     addWord={this.addWord}
                  />
               )
            }
            <Menu
               id="profile-menu"
               anchorEl={this.state.anchorEl}
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
               }}
               keepMounted
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
               }}
               open={this.state.openProfileMenu}
               onClose={this.closeProfileMenu}
            >
               <MenuItem disabled>{fullName}</MenuItem>
               <MenuItem onClick={this.signOut}>Log Out</MenuItem>
            </Menu>
         </div>
      );
   }
}

NavBar.propTypes = {
   signOut: PropTypes.func,
   addWord: PropTypes.func,
   auth: PropTypes.object,
   users: PropTypes.array
};

const mapStateToProps = state => {
   const {firestore, firebase} = state;
   return {
      users: firestore.ordered.users,
      auth: firebase.auth
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({addWord, signOut}, dispatch);
};

const mapCollectionToProps = () => [{collection: 'users'}];

export default compose(
   withStyles(styles, {
      name: 'NavBar'
   }),
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect(mapCollectionToProps)
)
(NavBar);
