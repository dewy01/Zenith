import { Trans, t } from '@lingui/macro';
import {
  AppBar,
  Box,
  PaletteColorOptions,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getSettings, mutateEditSettings } from '~/api/Settings/query';
import { blue, green, purple, red } from '../../Theme/Color';
import { LoadingView } from '../LoadingView/LoadingView';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import {
  ColorEditSection,
  ColorSection,
  LanguageSection,
  ReminderSection,
  RouteSection,
  ThemeSection,
} from './Section';

type PaletteColorKey = keyof PaletteColorOptions;
const getMainColor = (colorPalette: PaletteColorOptions) => {
  return colorPalette['500' as PaletteColorKey] as string;
};

const routes: { [routeName: string]: boolean } = {
  ['Notes']: true,
  ['Calendar']: true,
  ['Todo']: true,
  ['Projects']: true,
  ['Group Projects']: true,
};

const calendarColors: { [color: string]: string } = {
  ['Purple']: 'Purple',
  ['Red']: 'Red',
  ['Green']: 'Green',
  ['Blue']: 'Blue',
  ['Yellow']: 'Yellow',
};

const colors = [
  {
    name: t({ message: 'blue' }),
    value: 'blue',
    color: getMainColor(blue),
  },
  {
    name: t({ message: 'purple' }),
    value: 'purple',
    color: getMainColor(purple),
  },
  {
    name: t({ message: 'green' }),
    value: 'green',
    color: getMainColor(green),
  },
  { name: t({ message: 'red' }), value: 'red', color: getMainColor(red) },
];
const themeColor = [
  { name: t({ message: 'light' }), value: 'light', color: '#f1f1f1' },
  { name: t({ message: 'dark' }), value: 'dark', color: '#000000' },
];

const useStyles = makeStyles(() => ({
  box: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface newSettingsProps {
  theme?: string;
  color?: string;
  language?: string;
  reminder?: number;
  routes?: { [routeName: string]: boolean };
  colors?: { [color: string]: string };
}

export const SettingsView = () => {
  const { data: settings, isLoading } = getSettings();
  const { mutateAsync } = mutateEditSettings();
  const classes = useStyles();

  const handleClick = (newSettings: newSettingsProps) => {
    const updatedRoutes =
      newSettings.routes || (settings ? settings.routes : routes);
    const updatedColors =
      newSettings.colors || (settings ? settings.colors : calendarColors);
    if (newSettings && settings) {
      mutateAsync({
        ...settings,
        ...newSettings,
        routes: updatedRoutes,
        colors: updatedColors,
      });
    }
  };

  if (isLoading && !settings) {
    return <LoadingView />;
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">
            <Trans>Settings</Trans>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={(theme) => ({
          flex: 1,
          width: '100%',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(3),
          gap: 2,
          flexWrap: 'wrap',
        })}
      >
        <Paper sx={{ maxWidth: '370px', padding: 3 }}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography fontWeight={'medium'}>
              <Trans>Primary color</Trans>:
            </Typography>
            <Box display="flex" gap={1}>
              {colors.map((item) => (
                <ColorSection
                  key={item.color}
                  name={item.name}
                  value={item.value}
                  color={item.color}
                  classes={classes}
                  handleClick={handleClick}
                  settings={settings}
                />
              ))}
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ maxWidth: '320px', padding: 3 }}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography fontWeight={'medium'}>
              <Trans>Background color</Trans>:
            </Typography>
            <Box display="flex" gap={1}>
              {themeColor.map((item) => (
                <ThemeSection
                  key={item.color}
                  name={item.name}
                  value={item.value}
                  color={item.color}
                  classes={classes}
                  handleClick={handleClick}
                  settings={settings}
                />
              ))}
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ maxWidth: '320px', padding: 3 }}>
          <LanguageSection settings={settings} handleClick={handleClick} />
        </Paper>
        <Paper
          sx={{
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            paddingX: 3,
            paddingY: 2,
            gap: 2,
          }}
        >
          <ReminderSection settings={settings} handleClick={handleClick} />
        </Paper>

        <Paper sx={{ maxWidth: '350px', padding: 3 }}>
          <RouteSection settings={settings} handleClick={handleClick} />
        </Paper>

        <Paper sx={{ maxWidth: '350px', padding: 3 }}>
          <ColorEditSection settings={settings} handleClick={handleClick} />
        </Paper>

        <Paper
          sx={{
            maxWidth: '350px',
            padding: 3,
            gap: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={'medium'}>
            <Trans>Delete account</Trans>:
          </Typography>
          <DeleteAccountDialog />
        </Paper>
      </Box>
    </>
  );
};
