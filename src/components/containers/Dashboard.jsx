import React, {Component} from 'react';
import {Container, CssBaseline, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {addWord, deleteWord, updateWord} from '../../actions/words-actions';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import {firestoreConnect} from 'react-redux-firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import {bindActionCreators} from 'redux';
import WordList from './WordList';
import noData from '../../static/images/no-data.png';

const styles = theme => ({
   root: {
      [theme.breakpoints.up('md')]: {
         display: 'flex',
         justifyContent: 'flex-start',
         flexWrap: 'wrap'
      },
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
   }
});

class Dashboard extends Component {
   render() {
      const {classes, words, auth} = this.props;
      if (!words) {
         return (<React.Fragment />);
      } else if (words.length === 0) {
      }
      const wordsOfCurrentUser = words.filter(word => word.userId === auth.uid);

      return (
         <Container component="div" maxWidth="lg" className={classes.root}>
            <CssBaseline />
            {
               wordsOfCurrentUser.length === 0
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
            <WordList
               words={wordsOfCurrentUser}
               updateWord={this.props.updateWord}
               deleteWord={this.props.deleteWord}
            />
         </Container>
      );
   }
}

Dashboard.propTypes = {
   words: PropTypes.array,
   addWord: PropTypes.func,
   auth: PropTypes.object,
   err: PropTypes.object,
   deleteWord: PropTypes.func,
   updateWord: PropTypes.func
};

const mapStateToProps = state => {
   const {firestore, firebase, words} = state;
   return {
      words: firestore.ordered.words,
      auth: firebase.auth,
      err: words.err
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({addWord, updateWord, deleteWord}, dispatch);
};

const mapCollectionToProps = () => [{collection: 'words', orderBy: ['createdAt', 'desc']}];

export default compose(
   withStyles(styles, {
      name: 'Dashboard'
   }),
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect(mapCollectionToProps)
)(Dashboard);

