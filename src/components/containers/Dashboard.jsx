import React, {Component} from 'react';
import {Button, Container} from '@material-ui/core';
import {connect} from 'react-redux';
import {addWord} from '../../actions/words-actions';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {firestoreConnect} from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import AddNewWordDialog from './AddNewWordDialog';
import {bindActionCreators} from 'redux';
import WordList from './WordList';

const styles = theme => ({
   root: {
      marginTop: theme.spacing(2)
   },
});

class Dashboard extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openNewWordDialog: false
      };
      this.openDialog = this.openDialog.bind(this);
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
      Promise.all([that.props.addWord(data)])
         .finally(() => that.closeDialog());
   }

   render() {
      const {classes, words, auth} = this.props;
      if (!words) {
         return (<React.Fragment />);
      }
      return (
         <Container component="div" maxWidth="lg" className={classes.root}>
            <Button
               id="open-dialog-button"
               color="primary"
               variant="outlined"
               style={{margin: '8px'}}
               onClick={this.openDialog}
            >
               add word
            </Button>
            <WordList words={words.filter(word => word.userId === auth.uid)} />
            <AddNewWordDialog
               disabled={this.props.isLoading}
               open={this.state.openNewWordDialog}
               addWord={this.addWord}
               closeDialog={this.closeDialog}
            />
         </Container>
      );
   }
}

Dashboard.propTypes = {
   words: PropTypes.array,
   isLoading: PropTypes.bool,
   addWord: PropTypes.func,
   auth: PropTypes.object
};

const mapStateToProps = state => {
   const {firestore, firebase, spinner} = state;
   return {
      words: firestore.ordered.words,
      auth: firebase.auth,
      isLoading: spinner.open
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({addWord}, dispatch);
};

const mapCollectionToProps = () => [{collection: 'words'}];

export default compose(
   withStyles(styles, {
      name: 'Dashboard'
   }),
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect(mapCollectionToProps)
)(Dashboard);

