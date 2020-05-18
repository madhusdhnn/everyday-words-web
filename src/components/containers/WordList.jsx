import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Delete} from '@material-ui/icons';
import {red} from '@material-ui/core/colors';
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Divider,
   Grid,
   IconButton,
   Link,
   Paper,
   Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';

const styles = theme => ({
   paper: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
         boxShadow: `0 3px 1px -2px rgba(0, 0, 0, 0.2),
         0 2px 2px 0 rgba(0, 0, 0, 0.14),
         0 1px 5px 0 rgba(0, 0, 0, 0.12)`
      }
   },
   cancelActionBtn: {
      margin: theme.spacing(3, 0),
      color: theme.palette.text.secondary
   },
   deleteActionBtn: {
      margin: theme.spacing(3, 0),
      color: theme.palette.common.white,
      backgroundColor: red[500],
      '&:hover': {
         backgroundColor: red[700]
      }
   },
   dialogAction: {
      padding: theme.spacing(1, 3)
   },
   word: {
      padding: theme.spacing(1, 0),
      textTransform: 'capitalize',
   },
   delete: {
      padding: theme.spacing(1, 0),
      color: theme.palette.error.main
   },
   text: {
      fontSize: theme.spacing(2)
   }
});

class WordList extends Component {

   static urlLike(str) {
      const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
      return str.match(pattern);
   }

   constructor(props) {
      super(props);
      this.state = {
         wordId: '',
         openConfirmDialog: false
      };
      this.deleteWord = this.deleteWord.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
   }

   deleteWord() {
      this.props.deleteWord(this.state.wordId);
      this.closeDialog();
   }

   openDialog(wordId) {
      this.setState({
         wordId: wordId,
         openConfirmDialog: true
      });
   }

   closeDialog() {
      this.setState({
         wordId: '',
         openConfirmDialog: false
      });
   }

   render() {
      const {classes, words} = this.props;
      return (
         <React.Fragment>
            {
               words.map(word =>
                  (
                     <Paper key={word.id} elevation={0} variant="outlined" className={classes.paper}>
                        <Grid container spacing={2}>
                           <Grid item xs={10} sm={10} lg={10}>
                              <Typography
                                 variant="h5"
                                 className={classes.word}
                                 color="primary"
                              >
                                 {word.word}
                              </Typography>
                           </Grid>
                           <Grid item xs={2} sm={2} lg={2}>
                              {/* eslint-disable-next-line react/jsx-no-bind */}
                              <IconButton className={classes.delete} onClick={this.openDialog.bind(this, word.id)}>
                                 <Delete />
                              </IconButton>
                           </Grid>
                        </Grid>
                        <Divider style={{marginBottom: 16}} />
                        <Grid container spacing={3}>
                           <Grid item xs={4} sm={2} lg={2}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                                 color="textSecondary"
                              >
                                 Meaning:
                              </Typography>
                           </Grid>
                           <Grid item xs={8} sm={10} lg={10}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                              >
                                 {word.meaning}
                              </Typography>
                           </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                           <Grid item xs={4} sm={2} lg={2}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                                 color="textSecondary"
                              >
                                 Source:
                              </Typography>
                           </Grid>
                           <Grid item xs={8} sm={10} lg={10}>
                              {
                                 WordList.urlLike(word.source)
                                    ? (
                                       <Link
                                          className={classes.text}
                                          href={word.source}
                                          color="secondary"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                       >
                                          open link
                                       </Link>
                                    )
                                    : (
                                       <Typography
                                          variant="body2"
                                          className={classes.text}
                                          color="inherit"
                                       >
                                          {word.source}
                                       </Typography>
                                    )
                              }
                           </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                           <Grid item xs={4} sm={2} lg={2}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                                 color="textSecondary"
                              >
                                 Time:
                              </Typography>
                           </Grid>
                           <Grid item xs={8} sm={10} lg={10}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                                 color="textSecondary"
                              >
                                 {moment(word.createdAt.toDate()).calendar()}
                              </Typography>
                           </Grid>
                        </Grid>
                     </Paper>
                  )
               )
            }
            <Dialog
               disableBackdropClick
               disableEscapeKeyDown
               fullWidth
               maxWidth="sm"
               open={this.state.openConfirmDialog}
               onClose={this.closeDialog}
               aria-labelledby="delete-word-title"
            >
               <DialogTitle id="delete-word-title">Delete Word</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     This will permenantly remove the word from your list
                  </DialogContentText>
               </DialogContent>
               <DialogActions className={classes.dialogAction}>
                  <Button
                     variant="text"
                     onClick={this.closeDialog}
                     className={classes.cancelActionBtn}
                  >
                     cancel
                  </Button>
                  <Button
                     variant="contained"
                     onClick={this.deleteWord}
                     className={classes.deleteActionBtn}
                  >
                     delete
                  </Button>
               </DialogActions>
            </Dialog>
         </React.Fragment>
      );
   }
}

WordList.propTypes = {
   words: PropTypes.array.isRequired,
   deleteWord: PropTypes.func.isRequired
};

export default withStyles(styles)(WordList);
