import React, {Component} from 'react';
import '../../styles/main.scss';
import theme from '../../theme';
import {ThemeProvider} from '@material-ui/core/styles';
import Spinner from './Spinner';
import SnackBar from './SnackBar';
import NavBar from './NavBar';

const style = {width: '100%'};

class Layout extends Component {
   render() {
      return (
         <ThemeProvider theme={theme}>
            <Spinner />
            <SnackBar />
            <NavBar />
            <div style={style}>
               {this.props.children}
            </div>
         </ThemeProvider>
      );
   }
}

export default Layout;
