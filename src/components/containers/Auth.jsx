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
         isRegister: false
      };
      this.changeIsRegister = this.changeIsRegister.bind(this);
   }

   changeIsRegister() {
      if (this.props.identity.message) {
         this.props.clearIdentity();
      }
      this.setState(prevState => ({
         isRegister: !prevState.isRegister
      }));
   }

   render() {
      const {auth, identity} = this.props;
      const {isRegister} = this.state;

      if (!auth.isLoaded) {
         return (<React.Fragment />);
      } else if (!auth.uid) {
         return (
            <React.Fragment>
               {isRegister
                  ? <RegisterForm identity={identity} isLoading={this.props.open} />
                  : <LoginForm identity={identity} isLoading={this.props.open} />
               }
               {
                  <Grid container justify="center">
                     <Grid item>
                        <Typography
                           style={{textDecoration: 'underline', cursor: 'pointer', padding: 10}}
                           variant="body2"
                           color="primary"
                           onClick={this.changeIsRegister}
                        >
                           {`${isRegister ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign Up'}`}
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
   open: PropTypes.bool,
   auth: PropTypes.object,
   identity: PropTypes.object,
   clearIdentity: PropTypes.func
};

const mapStateToProps = state => {
   const {firebase, identity, spinner} = state;
   return {
      auth: firebase.auth,
      open: spinner.open,
      identity
   };
};

const mapDispatchToProps = dispatch => {
   return bindActionCreators({clearIdentity}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
