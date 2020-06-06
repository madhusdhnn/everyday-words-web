import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, CssBaseline, Paper, TextField, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {login} from '../../actions/identity-actions';
import PropTypes from 'prop-types';
import withAuthFormStyles from '../hoc/withAuthFormStyles';

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
      }

      if (!this.state.password) {
         this.setState({
            errorPassword: true
         });
      } else {
         this.props.login({email: this.state.email, password: this.state.password});
      }
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
                     error={!!identity.message || this.state.errorEmail}
                     value={this.state.email}
                     onChange={this.changeEmail}
                     className={classes.formField}
                     helperText={`${this.state.errorEmail ? 'Please type some text' : ''}`}
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
                     error={!!identity.message || this.state.errorPassword}
                     value={this.state.password}
                     onChange={this.changePassword}
                     className={classes.formField}
                     helperText={`${this.state.errorPassword ? 'Please type some text' : ''}`}
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
                  {
                     !!identity.message
                        ?
                        (
                           <Typography paragraph variant="body1" color="error">
                              Error: {identity.message}
                           </Typography>
                        )
                        : ''
                  }
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

export default connect(null, mapDispatchToProps)(withAuthFormStyles(LoginForm, {name: 'LoginForm'}));
