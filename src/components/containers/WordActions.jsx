import React, {Component} from 'react';
import {Grid, IconButton} from '@material-ui/core';
import {Create, Delete} from '@material-ui/icons';

import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
   delete: {
      color: theme.palette.error.main
   },
   edit: {
      color: theme.palette.primary.main
   }
});

class WordActions extends Component {
   constructor(props) {
      super(props);
      this.editAction = this.editAction.bind(this);
      this.deleteAction = this.deleteAction.bind(this);
   }

   editAction() {
      this.props.editAction(this.props.word);
   }

   deleteAction() {
      this.props.deleteAction(this.props.word.id);
   }

   render() {
      const {classes} = this.props;
      return (
         <Grid container spacing={1}>
            <Grid item xs={6}>
               <IconButton
                  className={classes.edit}
                  onClick={this.editAction}
               >
                  <Create />
               </IconButton>
            </Grid>
            <Grid item xs={6}>
               <IconButton
                  className={classes.delete}
                  onClick={this.deleteAction}
               >
                  <Delete />
               </IconButton>
            </Grid>
         </Grid>
      );
   }
}

WordActions.propTypes = {
   word: PropTypes.object.isRequired,
   editAction: PropTypes.func.isRequired,
   deleteAction: PropTypes.func.isRequired
};

export default withStyles(styles)(WordActions);
