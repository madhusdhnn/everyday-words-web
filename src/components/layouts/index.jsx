import React, {Component} from 'react';
import '../../styles/main.scss';
import theme from '../../theme';
import {ThemeProvider} from '@material-ui/core/styles';
import Spinner from './Spinner';
import SnackBar from './SnackBar';
import NavBar from './NavBar';
import Auth from '../containers/Auth';

const style = {width: '100%', marginBottom: 10};

class Layout extends Component {
   render() {
      return (
         <ThemeProvider theme={theme}>
            <Spinner />
            <SnackBar />
            <Auth>
               <NavBar />
               <div style={style}>
                  {this.props.children}
               </div>
            </Auth>
         </ThemeProvider>
      );
   }
}

export default Layout;
