import React, {Component} from 'react';
import {Button, Container, CssBaseline, Grid, Paper, TextField, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {register} from '../../actions/identity-actions';

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
      margin: theme.spacing(3, 0, 2)
   }
});

class RegisterForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         errorEmail: false,
         errorPassword: false,
         errorFirstName: false,
         errorLastName: false
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.changeFirstName = this.changeFirstName.bind(this);
      this.changeLastName = this.changeLastName.bind(this);
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

   changeFirstName(e) {
      this.setState({
         firstName: e.target.value,
         errorFirstName: false
      });
   }

   changeLastName(e) {
      this.setState({
         lastName: e.target.value,
         errorLastName: false
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
         this.props.register({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
         });
      }
   }

   render() {
      const {classes} = this.props;
      return (
         <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper elevation={2} className={classes.paper}>
               <Typography component="h1" variant="h5">
                  Everyday Words
               </Typography>
               <form
                  noValidate
                  className={classes.form}
                  autoComplete="off"
                  onSubmit={this.onSubmit}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12} lg={6}>
                        <TextField
                           fullWidth
                           required
                           error={this.state.errorFirstName}
                           value={this.state.firstName}
                           onChange={this.changeFirstName}
                           className={classes.formField}
                           helperText={this.state.errorFirstName ? 'Please enter some text' : ''}
                           type="text"
                           variant="outlined"
                           margin="normal"
                           id="firstName"
                           label="First Name"
                           name="firstName"
                        />
                     </Grid>
                     <Grid item xs={12} lg={6}>
                        <TextField
                           fullWidth
                           required
                           error={this.state.errorLastName}
                           value={this.state.lastName}
                           onChange={this.changeLastName}
                           className={classes.formField}
                           helperText={this.state.errorLastName ? 'Please enter some text' : ''}
                           type="text"
                           variant="outlined"
                           margin="normal"
                           id="lastName"
                           label="Last Name"
                           name="lastName"
                        />
                     </Grid>
                     <Grid item xs={12}>
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
                     </Grid>
                     <Grid item xs={12}>
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
                     </Grid>
                  </Grid>
                  <Button
                     disabled={!this.props.isLoaded} // fix this
                     type="submit"
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Sign Up
                  </Button>
               </form>
            </Paper>
         </Container>
      );
   }
}


RegisterForm.propTypes = {
   isLoaded: PropTypes.bool.isRequired,
   register: PropTypes.func
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({register}, dispatch);
};

export default compose(
   withStyles(styles, {
      name: 'RegisterForm'
   }),
   connect(
      null,
      mapDispatchToProps
   )
)(RegisterForm);

