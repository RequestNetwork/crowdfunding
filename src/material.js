import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9aabc3',
      main: '#6b7c93',
      dark: '#3f5065',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8ec2ff',
      main: '#5392ff',
      dark: '#0065cb',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Robotto'].join(','),
  },
});
