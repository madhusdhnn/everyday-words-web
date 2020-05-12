import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {Button, Container, CssBaseline, Paper, TextField, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {login} from '../../actions/identity-actions';

const styles = theme => ({
   paper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2, 2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
         padding: theme.spacing(3, 4)
      }
   },
   form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
   },
   formField: {
      margin: theme.spacing(2, 0)
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
      [theme.breakpoints.down('xs')]: {
         width: '100%'
      }
   }
});

class LoginForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         errorEmail: false,
         errorPassword: false
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
   }

   changeEmail(e) {
      this.setState({
         email: e.target.value,
         errorEmail: false
      });
   }

   changePassword(e) {
      this.setState({
         password: e.target.value,
         errorPassword: false
      });
   }

   onSubmit(e) {
      e.preventDefault();
      if (!this.state.email) {
         this.setState({
            errorEmail: true
         });
      } else if (!this.state.password) {
         this.setState({
            errorPassword: true
         });
      } else {
         this.props.login({email: this.state.email, password: this.state.password});
      }
   }

   render() {
      const {classes} = this.props;
      return (
         <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper elevation={2} className={classes.paper}>
               <Typography component="h1" variant="h5">
                  Sign In
               </Typography>
               <form
                  noValidate
                  className={classes.form}
                  autoComplete="off"
                  onSubmit={this.onSubmit}
               >
                  <TextField
                     fullWidth
                     required
                     error={this.state.errorEmail}
                     value={this.state.email}
                     onChange={this.changeEmail}
                     className={classes.formField}
                     helperText={this.state.errorEmail ? 'Please enter a valid email' : ''}
                     type="email"
                     variant="outlined"
                     margin="normal"
                     id="email"
                     label="Email"
                     name="email"
                  />
                  <TextField
                     fullWidth
                     required
                     error={this.state.errorPassword}
                     value={this.state.password}
                     onChange={this.changePassword}
                     className={classes.formField}
                     helperText={this.state.errorPassword ? 'Please enter some text' : ''}
                     type="password"
                     variant="outlined"
                     margin="normal"
                     id="password"
                     label="Password"
                     name="password"
                  />
                  <Button
                     disabled={!this.props.isLoaded} // fix this
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Sign In
                  </Button>
               </form>
            </Paper>
         </Container>
      );
   }
}

LoginForm.propTypes = {
   isLoaded: PropTypes.bool.isRequired,
   login: PropTypes.func
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({login}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'LoginForm'
   }),
   connect(
      null,
      mapDispatchToProps
   )
)(LoginForm);
