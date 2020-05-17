import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Divider, Grid, Link, Paper, Typography} from '@material-ui/core';
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
   word: {
      textTransform: 'capitalize',
   },
   text: {
      fontSize: theme.spacing(2),
      marginBottom: theme.spacing(1)
   }
});

class WordList extends Component {
   render() {
      const {classes, words} = this.props;
      return (
         <React.Fragment>
            {
               words.map(word =>
                  (
                     <Paper key={word.id} elevation={0} variant="outlined" className={classes.paper}>
                        <Typography
                           paragraph
                           variant="h5"
                           className={classes.word}
                           color="primary"
                        >
                           {word.word}
                        </Typography>
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
                              <Link
                                 className={classes.text}
                                 href={word.source}
                                 color="secondary"
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 open link
                              </Link>
                           </Grid>
                        </Grid>
                     </Paper>
                  )
               )
            }
         </React.Fragment>
      );
   }
}

WordList.propTypes = {
   words: PropTypes.array.isRequired
};

export default withStyles(styles)(WordList);
