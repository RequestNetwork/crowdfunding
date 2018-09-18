import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#3f5065',
      light: '#9aabc3',
      main: '#6b7c93',
    },
    secondary: {
      contrastText: '#fff',
      dark: '#0065cb',
      light: '#8ec2ff',
      main: '#5392ff',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto'].join(','),
    title: {
      color: '#0D2946',
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    subheading: {
      color: '#6b7c93',
      fontSize: 18,
      fontWeight: 300,
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
    display3: {
      color: '#0D2946',
      fontSize: 48,
      fontWeight: 'bold',
      lineHeight: 'normal',
    },
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: '2px',
        width: '100%',
      },
      barColorPrimary: {
        backgroundColor: '#5392FF',
      },
    },
    MuiDrawer: {
      paper: {
        background: 'linear-gradient(180deg, #f5f6fa 52.26%, #fefefe 100%)',
        maxWidth: 350,
        width: '100%',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: 'unset',
      },
      root: {
        justifyContent: 'center',
      },
    },
    MuiCardHeader: {
      title: {
        color: '#0D2946',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 5,
        fontSize: 14,
        fontWeight: 500,
        minHeight: '3rem',
        textTransform: 'unset',
      },
      sizeSmall: {
        fontSize: 12,
        height: 32,
      },
      outlined: {
        borderColor: 'inherit',
      },
      raisedPrimary: {
        background: 'linear-gradient(180deg, #5392FF 0%, #3E82F7 98.52%)',
        boxShadow: 'unset',
        color: 'white',
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
      input: {
        paddingBottom: '1rem',
        paddingLeft: '1rem',
        paddingTop: '1rem',
      },
      root: {
        backgroundColor: 'white',
        border: '1px solid #E3E3E3',
        borderRadius: 5,
        color: '#617B9F',
        fontFamily: ['Poppins', 'Roboto'].join(','),
        fontSize: 14,
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
        fontSize: 18,
        textTransform: 'unset',
      },
    },
  },
});
