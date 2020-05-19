import React, {Component} from 'react';
import '../../styles/main.scss';
import theme from '../../theme';
import {createGenerateClassName, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import Spinner from './Spinner';
import SnackBar from './SnackBar';
import NavBar from './NavBar';
import Auth from '../containers/Auth';

const generateClassName = createGenerateClassName({disableGlobal: true, productionPrefix: 'ewd-ttm'});

const style = {width: '100%', marginBottom: 10};

class Layout extends Component {
   render() {
      return (
         <StylesProvider generateClassName={generateClassName}>
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
         </StylesProvider>
      );
   }
}

export default Layout;
