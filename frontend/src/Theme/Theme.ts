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
      },
      typography: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeightRegular: 450, // Regular font weight
        fontWeightMedium: 500,  // Medium font weight
        fontWeightBold: 600,    // Bold font weight
      },
    });

    return {
      theme: theme,
      routes : settings.routes,
      language: settings.language
    };
  } else {
    return {
      theme:dark,
      routes:{},
      language: 'en'
    }
  }
};