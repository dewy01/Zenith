import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { blue } from './Color';

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
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
});
