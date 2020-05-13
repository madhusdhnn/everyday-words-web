import React from 'react';

export const styles = theme => ({
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
      flexDirection: 'column',
      marginTop: theme.spacing(4)
   },
   formField: {
      margin: theme.spacing(2, 0)
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
      alignSelf: 'flex-end',
      [theme.breakpoints.down('xs')]: {
         width: '100%'
      }
   }
});

class AuthForm extends React.Component {
   constructor(props) {
      super(props);
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
   }

   changeEmail() {
   }

   changePassword() {
   }

}

export default AuthForm;
