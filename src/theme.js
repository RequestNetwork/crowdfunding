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
    fontFamily: ['Poppins', 'Roboto'].join(','),
    title: {
      fontWeight: 'bold',
      color: '#0D2946',
      letterSpacing: 1,
      fontSize: 24,
    },
    subheading: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
      fontWeight: 300,
      fontSize: 18,
      color: '#6b7c93',
    },
    display3: {
      fontWeight: 'bold',
      lineHeight: 'normal',
      fontSize: 48,
      color: '#0D2946',
    },
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        width: '100%',
        borderRadius: '2px',
      },
      barColorPrimary: {
        backgroundColor: '#5392FF',
      },
    },
    MuiDrawer: {
      paper: {
        width: '100%',
        maxWidth: 350,
        background: 'linear-gradient(180deg, #f5f6fa 52.26%, #fefefe 100%)',
      },
    },
    MuiAppBar: {
      root: {
        justifyContent: 'center',
      },
      colorPrimary: {
        backgroundColor: 'unset',
      },
    },
    MuiCardHeader: {
      title: {
        fontWeight: 'bold',
        color: '#0D2946',
        letterSpacing: 1,
        textAlign: 'center',
        fontSize: 18,
      },
    },
    MuiButton: {
      root: {
        textTransform: 'unset',
        borderRadius: 5,
        fontWeight: 500,
        fontSize: 14,
        minHeight: '3rem',
      },
      sizeSmall: {
        fontSize: 12,
        height: 32,
      },
      outlined: {
        borderColor: 'inherit',
      },
      raisedPrimary: {
        boxShadow: 'unset',
        color: 'white',
        background: 'linear-gradient(180deg, #5392FF 0%, #3E82F7 98.52%)',
      },
      disabled: {
        background: 'grey',
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '1rem',
      },
    },
    MuiInputLabel: {
      formControl: {
        position: 'unset',
      },
    },
    MuiFormLabel: {
      error: {
        paddingTop: '1rem',
      },
    },
    MuiSelect: {
      icon: {
        right: '24px',
      },
    },
    MuiInput: {
      root: {
        borderRadius: 5,
        color: '#617B9F',
        border: '1px solid #E3E3E3',
        fontSize: 14,
        backgroundColor: 'white',
        fontFamily: ['Poppins', 'Roboto'].join(','),
      },
      input: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        paddingLeft: '1rem',
      },
    },
    MuiInputAdornment: {
      root: {
        maxHeight: 'unset',
        paddingRight: '2rem',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '14px',
        fontWeight: 'unset',
      },
    },
    MuiTab: {
      root: {
        textTransform: 'unset',
        fontSize: 18,
      },
    },
  },
});
