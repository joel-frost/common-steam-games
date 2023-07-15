import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#B2BAC2',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a2027',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: '#000000', // Set the text color to black
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});
