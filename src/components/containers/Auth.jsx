import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Grid, Typography} from '@material-ui/core';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class Auth extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLogin: false
      };
      this.changeIsLogin = this.changeIsLogin.bind(this);
   }

   changeIsLogin() {
      this.setState({
         isLogin: true
      });
   }

   render() {
      const {auth} = this.props;
      const {isLogin} = this.state;

      if (!auth.isLoaded) {
         return (<React.Fragment />);
      } else if (!auth.uid) {
         return (
            <React.Fragment>
               {isLogin
                  ? <LoginForm isLoaded={auth.isLoaded} /> // pass err info from firebase, if any
                  : <RegisterForm isLoaded={auth.isLoaded} /> // pass err info from firebase, if any
               }
               {
                  <Grid container justify="center">
                     <Grid item>
                        <Typography
                           style={{textDecoration: 'underline', cursor: 'pointer', padding: 10}}
                           variant="body2"
                           color="primary"
                           onClick={this.changeIsLogin}
                        >
                           {
                              isLogin
                                 ? "Don't have an account? Sign Up"
                                 : 'Already have an account? Sign in'
                           }
                        </Typography>
                     </Grid>
                  </Grid>
               }
            </React.Fragment>
         );
      }
      return (
         <React.Fragment>
            <CssBaseline />
            {this.props.children}
         </React.Fragment>
      );
   }
}

Auth.propTypes = {
   auth: PropTypes.object
};

const mapStateToProps = state => {
   const {firebase} = state;
   return {auth: firebase.auth};
};

export default connect(mapStateToProps, null)(Auth);
