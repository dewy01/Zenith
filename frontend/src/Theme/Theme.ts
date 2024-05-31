import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { blue, green, purple, red } from './Color';
import 'typeface-montserrat';
import { getSettings } from '~/api/Settings/query';
import { useAuth } from '~/context/AuthContext';
import { PaletteMode } from '@mui/material';

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    background: {
      default: '#121212', 
      paper: '#1D1D1D', 
    },
    text: {
      primary: '#ffffff',
      secondary: grey[500],
    },
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
      default: '#fafafa', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#000000', 
      secondary: grey[800], 
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const handleColor = (color: string) => {
  switch (color) {
    case 'red':
      return red;
    case 'purple':
      return purple;
    case 'green':
      return green;
    default:
      return blue;
  }
};

export const handleSettings = () => {
  const { isAuthenticated } = useAuth();
  const { data: settings, isLoading } = getSettings();

  if (settings && !isLoading && isAuthenticated) {
    const theme = createTheme({
      palette: {
        mode: settings.theme as PaletteMode,
        primary: handleColor(settings.color),
        background: settings.theme === 'dark' ? {
          default: '#121212',
          paper: '#1D1D1D',
        } : {
          default: '#fafafa',
          paper: '#ffffff',
        },
        text: settings.theme === 'dark' ? {
          primary: '#ffffff',
          secondary: grey[500],
        } : {
          primary: '#000000',
          secondary: grey[800],
        },
      },
      typography: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeightRegular: 450, 
        fontWeightMedium: 500, 
        fontWeightBold: 600,  
      },
    });

    return {
      theme: theme,
      routes: settings.routes,
      language: settings.language
    };
  } else {
    return {
      theme: dark,
      routes: {},
      language: 'en'
    };
  }
};
