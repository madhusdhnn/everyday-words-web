import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Grid, Typography} from '@material-ui/core';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {clearIdentity} from '../../actions/identity-actions';
import {bindActionCreators} from 'redux';

class Auth extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
         isLogin: false
      };
      this.changeIsLogin = this.changeIsLogin.bind(this);
   }

   changeIsLogin() {
      if (this.props.identity.message) {
         this.props.clearIdentity();
      }
      this.setState(prevState => ({
         isLogin: !prevState.isLogin
      }));
   }

   render() {
      const {auth, identity} = this.props;
      const {isLogin} = this.state;

      if (!auth.isLoaded) {
         return (<React.Fragment />);
      } else if (!auth.uid) {
         return (
            <React.Fragment>
               {isLogin
                  ? <LoginForm identity={identity} isLoaded={auth.isLoaded} />
                  : <RegisterForm identity={identity} isLoaded={auth.isLoaded} />
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
   auth: PropTypes.object,
   identity: PropTypes.object,
   clearIdentity: PropTypes.func
};

const mapStateToProps = state => {
   const {firebase, identity} = state;
   return {auth: firebase.auth, identity};
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({clearIdentity}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
