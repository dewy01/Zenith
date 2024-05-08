import { BrowserRouter } from 'react-router-dom';
import { Router } from './component/Router';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import darkScrollbar from '@mui/material/darkScrollbar';
import { SnackbarOrigin, SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enGB } from 'date-fns/locale';
import { handleSettings } from './Theme';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    bottom: 34,
  },
});

const snackbarOptions = {
  vertical: 'bottom',
  horizontal: 'right',
} as SnackbarOrigin;

document.addEventListener(
  'auxclick',
  (e: Event) => {
    e.preventDefault();
  },
  true,
);

const App = () => {
  const { theme, routes, language } = handleSettings();
  const classes = useStyles();

  return (
    <SnackbarProvider
      preventDuplicate
      anchorOrigin={snackbarOptions}
      classes={{ containerRoot: classes.root }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router routes={routes} />
            <CssBaseline />
            <GlobalStyles styles={{ ...darkScrollbar() }} />
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  );
};

export default App;
