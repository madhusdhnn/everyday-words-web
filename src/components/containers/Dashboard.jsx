import React, {Component} from 'react';
import {Box, Button, Container, CssBaseline, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {addWord} from '../../actions/words-actions';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {firestoreConnect} from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import AddNewWordDialog from './AddNewWordDialog';
import {bindActionCreators} from 'redux';
import WordList from './WordList';
import noData from '../../static/images/no-data.png';

const styles = theme => ({
   root: {
      marginTop: theme.spacing(2)
   },
   imageContainer: {
      display: 'flex',
      margin: '0 auto',
      maxWidth: theme.spacing(50),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
   image: {
      height: theme.spacing(20),
      width: 'auto',
   },
   boxContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   }
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
      } else if (words.length === 0) {
      }
      return (
         <Container component="div" maxWidth="lg" className={classes.root}>
            <CssBaseline />
            {
               words.length === 0
                  ? (
                     <Container component="div" maxWidth="xs" className={classes.imageContainer}>
                        <img src={noData} alt="No Data Pad" className={classes.image} />
                        <Typography style={{marginTop: 16}} paragraph variant="body2">
                           Your account is ready to go. Just add words.
                        </Typography>
                     </Container>
                  )
                  : (<React.Fragment />)
            }
            <Box component="div" m={`${words.length === 0 ? 1 : 0}`} className={`${words.length === 0 ? classes.boxContainer : ''}`}>
               <Button
                  id="open-dialog-button"
                  color="primary"
                  variant="outlined"
                  style={{margin: '8px'}}
                  onClick={this.openDialog}
               >
                  add word
               </Button>
            </Box>
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

