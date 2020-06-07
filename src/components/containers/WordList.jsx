import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
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
   Link,
   Paper,
   Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import EditWordDialog from './WordDialog';
import WordActions from './WordActions';

const styles = theme => ({
   paper: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
         flexBasis: '30%'
      }
   },
   cancelActionBtn: {
      color: theme.palette.text.secondary
   },
   deleteActionBtn: {
      color: theme.palette.common.white,
      backgroundColor: red[500],
      '&:hover': {
         backgroundColor: red[700]
      }
   },
   dialogAction: {
      padding: theme.spacing(1, 3, 2, 3)
   },
   word: {
      padding: theme.spacing(1.5, 0),
      textTransform: 'capitalize',
   },
   text: {
      fontSize: theme.spacing(2)
   },
   time: {
      textAlign: 'right'
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
         word: '',
         meaning: '',
         source: '',
         openConfirmDialog: false,
         openEditFormDialog: false
      };
      this.deleteWord = this.deleteWord.bind(this);
      this.closeDeleteConfirmDialog = this.closeDeleteConfirmDialog.bind(this);
   }

   deleteWord() {
      this.props.deleteWord(this.state.wordId);
      this.closeDeleteConfirmDialog();
   }

   closeDeleteConfirmDialog() {
      this.setState({
         wordId: '',
         openConfirmDialog: false
      });
   }

   openDeleteConfirmDialog = (wordId) => {
      const that = this;
      that.setState({
         wordId: wordId,
         openConfirmDialog: true
      });
   }

   openEditFormDialog = (word) => {
      const that = this;
      that.setState({
         wordId: word.id,
         word: word.word,
         meaning: word.meaning,
         source: word.source,
         openEditFormDialog: true
      });
   }

   closeEditFormDialog = () => {
      const that = this;
      that.setState({
         wordId: '',
         word: '',
         meaning: '',
         source: '',
         openEditFormDialog: false
      });
   }

   updateWord = ({word, meaning, source}) => {
      const that = this;
      that.props.updateWord(that.state.wordId, {word, meaning, source});
      that.closeEditFormDialog();
   }

   render() {
      const {classes, words} = this.props;
      return (
         <React.Fragment>
            {
               words.map(word =>
                  (
                     <Paper key={word.id} elevation={2} className={classes.paper}>
                        <Grid container spacing={2}>
                           <Grid item xs={8} sm={8} md={8} lg={9}>
                              <Typography
                                 variant="h5"
                                 className={classes.word}
                                 color="primary"
                              >
                                 {word.word}
                              </Typography>
                           </Grid>
                           <Grid item xs={4} sm={4} md={4} lg={3}>
                              <WordActions
                                 word={word}
                                 editAction={this.openEditFormDialog}
                                 deleteAction={this.openDeleteConfirmDialog}
                              />
                           </Grid>
                        </Grid>
                        <Divider style={{marginBottom: 16}} />
                        <Grid container spacing={3}>
                           <Grid item xs={4} sm={2} md={3} lg={4}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                                 color="textSecondary"
                              >
                                 Meaning:
                              </Typography>
                           </Grid>
                           <Grid item xs={8} sm={10} md={9} lg={8}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                              >
                                 {word.meaning}
                              </Typography>
                           </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                           <Grid item xs={4} sm={2} md={3} lg={4}>
                              <Typography
                                 variant="body2"
                                 className={classes.text}
                                 color="textSecondary"
                              >
                                 Source:
                              </Typography>
                           </Grid>
                           <Grid item xs={8} sm={10} md={9} lg={8}>
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
                        <Divider style={{margin: '16px 0'}} />
                        <Typography
                           variant="body2"
                           color="textSecondary"
                           className={classes.time}
                        >
                           {moment(word.createdAt.toDate()).calendar()}
                        </Typography>
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
               onClose={this.closeDeleteConfirmDialog}
               aria-labelledby="delete-word-title"
            >
               <DialogTitle id="delete-word-title">Delete Word</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     This will permanently remove the word from your list
                  </DialogContentText>
               </DialogContent>
               <DialogActions className={classes.dialogAction}>
                  <Button
                     variant="text"
                     onClick={this.closeDeleteConfirmDialog}
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
            {
               this.state.openEditFormDialog && (
                  <EditWordDialog
                     isEdit
                     open={this.state.openEditFormDialog}
                     word={this.state.word}
                     meaning={this.state.meaning}
                     source={this.state.source}
                     close={this.closeEditFormDialog}
                     updateWord={this.updateWord}
                  />
               )
            }
         </React.Fragment>
      );
   }
}

WordList.propTypes = {
   words: PropTypes.array.isRequired,
   deleteWord: PropTypes.func.isRequired,
   updateWord: PropTypes.func.isRequired
};

export default withStyles(styles)(WordList);
