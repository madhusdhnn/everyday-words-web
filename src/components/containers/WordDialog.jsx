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

class WordDialog extends Component {

   static isEmpty(...strings) {
      return strings.length !== 0 && strings.filter(s => s === '').length !== 0;
   }

   constructor(props) {
      super(props);
      this.state = {
         word: props.word ? props.word : '',
         meaning: props.meaning ? props.meaning : '',
         source: props.source ? props.source : ''
      };
      this.addWord = this.addWord.bind(this);
      this.updateWord = this.updateWord.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.clearForm = this.clearForm.bind(this);
   }

   addWord() {
      this.props.addWord({...this.state});
      this.clearForm();
   }

   updateWord() {
      this.props.updateWord({...this.state});
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
      this.props.close();
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
            <DialogTitle id="add-new-word-title">
               {this.props.isEdit ? 'Edit' : 'Fill in the form..'}
            </DialogTitle>
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
               {
                  this.props.isEdit
                     ? (
                        <Button
                           variant="contained"
                           onClick={this.updateWord}
                           color="primary"
                           className={classes.submit}
                        >
                           save
                        </Button>
                     )
                     : (
                        <Button
                           variant="contained"
                           onClick={this.addWord}
                           color="primary"
                           disabled={WordDialog.isEmpty(this.state.word, this.state.meaning, this.state.source)}
                           className={classes.submit}
                        >
                           add
                        </Button>
                     )
               }
            </DialogActions>
         </Dialog>
      );
   }
}

WordDialog.propTypes = {
   open: PropTypes.bool.isRequired,
   close: PropTypes.func.isRequired,
   isEdit: PropTypes.bool,
   word: PropTypes.string,
   meaning: PropTypes.string,
   source: PropTypes.string,
   addWord: PropTypes.func,
   updateWord: PropTypes.func
};

export default withStyles(styles)(WordDialog);
