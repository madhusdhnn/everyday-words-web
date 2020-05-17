import React, {Component} from 'react';
import {Grid, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
   textField: {
      [theme.breakpoints.up('sm')]: {
         margin: theme.spacing(1, 0),
      }
   }
});

class AddWordFormFields extends Component {
   constructor(props) {
      super(props);
      this.changeFormField = this.changeFormField.bind(this);
   }

   changeFormField(e) {
      this.props.changeFormField(e);
   }

   render() {
      const {classes} = this.props;
      return (
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField
                  fullWidth
                  id="word"
                  type="text"
                  name="word"
                  label="Word"
                  autoComplete="off"
                  color="primary"
                  value={this.props.word}
                  className={classes.textField}
                  onChange={this.changeFormField}
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  fullWidth
                  id="meaning"
                  type="text"
                  name="meaning"
                  label="Meaning"
                  autoComplete="off"
                  color="primary"
                  value={this.props.meaning}
                  className={classes.textField}
                  onChange={this.changeFormField}
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  fullWidth
                  id="source"
                  type="text"
                  name="source"
                  label="Source"
                  autoComplete="off"
                  color="primary"
                  helperText="* This can be any link or a normal text"
                  value={this.props.source}
                  className={classes.textField}
                  onChange={this.changeFormField}
               />
            </Grid>
         </Grid>
      );
   }
}

AddWordFormFields.propTypes = {
   word: PropTypes.string.isRequired,
   meaning: PropTypes.string.isRequired,
   source: PropTypes.string.isRequired,
   changeFormField: PropTypes.func.isRequired
};

export default withStyles(styles)(AddWordFormFields);
