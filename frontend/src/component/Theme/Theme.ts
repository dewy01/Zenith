import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { blue } from './Color';
import 'typeface-montserrat';

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export const light = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    background: {
      default: grey[50],
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});
