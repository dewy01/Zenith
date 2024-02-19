import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#E0FBFC',
      main: '#C2DFE3',
      dark: '#9DB4C0',
      contrastText: '#fff',
    },
    background:{
        default: '#212529'
    },
  },
});
