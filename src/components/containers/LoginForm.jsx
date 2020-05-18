import React, {Component} from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {Button, Container, CssBaseline, Paper, TextField, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {login} from '../../actions/identity-actions';
import PropTypes from 'prop-types';
import styles from './AuthFormStyles';

class LoginForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         errorPassword: false
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.clearForm = this.clearForm.bind(this);
   }

   changeEmail(e) {
      this.setState({
         email: e.target.value
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
      if (!this.state.password) {
         this.setState({
            errorPassword: true
         });
      } else {
         this.props.login({email: this.state.email, password: this.state.password});
         this.clearForm();
      }
   }

   clearForm() {
      this.setState({
         email: '',
         password: '',
         errorPassword: false
      });
   }

   render() {
      const {classes, identity} = this.props;
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
                     error={!!identity.message}
                     value={this.state.email}
                     onChange={this.changeEmail}
                     className={classes.formField}
                     helperText={identity.message ? identity.message : ''}
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
                     disabled={this.props.isLoading}
                     disableElevation={this.props.isLoading}
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
   identity: PropTypes.object.isRequired,
   isLoading: PropTypes.bool.isRequired,
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
