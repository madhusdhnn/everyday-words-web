import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AddWordFormFields from './AddWordFormFields';

const styles = theme => ({
   dialogAction: {
      padding: theme.spacing(1, 3)
   },
   submit: {
      margin: theme.spacing(3, 0),
      width: theme.spacing(11)
   }
});

class AddNewWordDialog extends Component {

   static isEmpty(...strings) {
      return strings.length !== 0 && strings.filter(s => s === '').length !== 0;
   }

   constructor(props) {
      super(props);
      this.state = {
         word: '',
         meaning: '',
         source: ''
      };
      this.addWord = this.addWord.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.clearForm = this.clearForm.bind(this);
   }

   addWord() {
      this.props.addWord({...this.state});
      this.clearForm();
   }

   changeFormField = (e) => {
      const that = this;
      that.setState({
         [e.target.id]: e.target.value
      });
   }

   closeDialog() {
      this.clearForm();
      this.props.closeDialog();
   }

   clearForm() {
      this.setState({
         word: '',
         meaning: '',
         source: ''
      });
   }

   render() {
      const {classes, open} = this.props;
      return (
         <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={this.closeDialog}
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
                  onClick={this.closeDialog}
                  color="primary"
                  className={classes.submit}
               >
                  cancel
               </Button>
               <Button
                  variant="contained"
                  onClick={this.addWord}
                  color="primary"
                  disabled={AddNewWordDialog.isEmpty(this.state.word, this.state.meaning, this.state.source)}
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
   closeDialog: PropTypes.func.isRequired,
   addWord: PropTypes.func.isRequired
};

export default withStyles(styles)(AddNewWordDialog);