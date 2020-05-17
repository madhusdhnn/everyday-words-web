import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AddWordFormFields from './AddWordFormFields';

const styles = theme => ({
   dialogAction: {
      padding: theme.spacing(1, 3)
   },
   disabled: {
      color: 'rgba(0, 0, 0, 0.26)',
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
   },
   submit: {
      margin: theme.spacing(3, 0),
      width: theme.spacing(11)
   }
});

class AddNewWordDialog extends Component {
   constructor(props) {
      super(props);
      this.state = {
         word: '',
         meaning: '',
         source: ''
      };
      this.addWord = this.addWord.bind(this);
   }

   addWord() {
      this.props.addWord({...this.state});
   }

   changeFormField = (e) => {
      const that = this;
      that.setState({
         [e.target.id]: e.target.value
      });
   }

   render() {
      const {classes, open, closeDialog} = this.props;
      return (
         <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={closeDialog}
            className={`${this.props.disabled ? classes.disabled : ''}`}
            aria-labelledby="add-new-word-title"
         >
            <DialogTitle id="add-new-word-title">Fill in the form..</DialogTitle>
            <DialogContent>
               <AddWordFormFields
                  word={this.state.word}
                  meaning={this.state.meaning}
                  source={this.state.source}
                  changeFormField={this.changeFormField}
               />
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
               <Button
                  variant="text"
                  onClick={closeDialog}
                  color="primary"
                  className={classes.submit}
               >
                  cancel
               </Button>
               <Button
                  variant="contained"
                  onClick={this.addWord}
                  color="primary"
                  className={classes.submit}
               >
                  add
               </Button>
            </DialogActions>
         </Dialog>
      );
   }
}

AddNewWordDialog.propTypes = {
   open: PropTypes.bool.isRequired,
   disabled: PropTypes.bool.isRequired,
   closeDialog: PropTypes.func.isRequired,
   addWord: PropTypes.func.isRequired
};

export default withStyles(styles)(AddNewWordDialog);