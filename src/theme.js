import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

let theme = createMuiTheme({
   palette: {
      primary: {
         light: '#8561c5',
         main: '#673ab7',
         dark: '#482880',
         contrastText: 'rgb(255, 255, 255)'
      },
      secondary: {
         light: '#ffcf33',
         main: '#ffc400',
         dark: '#b28900',
         contrastText: 'rgb(0, 0, 0)'
      },
      background: {
         default: '#f8f9fa'
      }
   }
});

theme = responsiveFontSizes(theme);

export default theme;
