import { useEffect, useMemo } from 'react';
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
import { GroupProvider } from './context/GroupRole';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { PdfProvider } from './context/PdfContext';

const useStyles = makeStyles({
  root: {
    bottom: 38,
    right: 5,
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

async function dynamicActivate(locale: string) {
  try {
    const { messages } = await import(`./locales/${locale}.po`);
    i18n.load(locale, messages);
    i18n.activate(locale);
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

const App = () => {
  const { theme, routes, language } = handleSettings();
  const classes = useStyles();

  const scrollbarStyle = useMemo(() => {
    return theme.palette.mode === 'dark' ? darkScrollbar() : () => {};
  }, [theme]);

  useEffect(() => {
    dynamicActivate(language);
  }, [language]);

  return (
    <I18nProvider i18n={i18n}>
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={snackbarOptions}
        classes={{ containerRoot: classes.root }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <GroupProvider>
                <PdfProvider>
                  <Router routes={routes} />
                </PdfProvider>
              </GroupProvider>
              <CssBaseline />
              <GlobalStyles styles={{ ...scrollbarStyle }} />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </I18nProvider>
  );
};

export default App;
