import {
  AppBar,
  Box,
  Checkbox,
  PaletteColorOptions,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { getSettings, mutateEditSettings } from '~/api/Settings/query';
import { LoadingView } from '../LoadingView/LoadingView';
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@mui/styles';
import { DeleteAccountDialog } from './DeleteAccountDialog';
import { Trans, t } from '@lingui/macro';
import { blue, green, purple, red } from '../../Theme/Color';

type PaletteColorKey = keyof PaletteColorOptions;
const getMainColor = (colorPalette: PaletteColorOptions) =>
  colorPalette['500' as PaletteColorKey];

const routes: { [routeName: string]: boolean } = {
  [t({ message: 'Notes' })]: true,
  [t({ message: 'Calendar' })]: true,
  [t({ message: 'Todo' })]: true,
  [t({ message: 'Projects' })]: true,
  [t({ message: 'Group Projects' })]: true,
};

const colors = [
  { name: t({ message: 'blue' }), color: getMainColor(blue) },
  { name: t({ message: 'purple' }), color: getMainColor(purple) },
  { name: t({ message: 'green' }), color: getMainColor(green) },
  { name: t({ message: 'red' }), color: getMainColor(red) },
];
const themeColor = [
  { name: t({ message: 'light' }), color: '#f1f1f1' },
  { name: t({ message: 'dark' }), color: '#000000' },
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

interface newSettingsProps {
  theme?: string;
  color?: string;
  language?: string;
  reminder?: number;
  routes?: { [routeName: string]: boolean };
}

const CheckboxOption = ({ name, checked, onClick }: any) => (
  <Box display="flex" alignItems="center">
    <Checkbox checked={checked} onClick={onClick} />
    <Typography>{name}</Typography>
  </Box>
);

export const SettingsView = () => {
  const { data: settings, isLoading } = getSettings();
  const { mutateAsync } = mutateEditSettings();
  const classes = useStyles();

  const handleClick = (newSettings: newSettingsProps) => {
    const updatedRoutes =
      newSettings.routes || (settings ? settings.routes : routes);
    if (newSettings && settings) {
      mutateAsync({
        ...settings,
        ...newSettings,
        routes: updatedRoutes,
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
                <Paper key={item.name} className={classes.paper} elevation={8}>
                  <Tooltip title={item.name}>
                    <Box
                      className={classes.box}
                      sx={{
                        backgroundColor: item.color,
                      }}
                      onClick={() => handleClick({ color: item.name })}
                    >
                      {settings?.color === item.name && (
                        <CheckIcon
                          sx={(theme) => ({
                            color: theme.palette.getContrastText(item.color),
                            stroke: theme.palette.getContrastText(item.color),
                            strokeWidth: 2,
                          })}
                        />
                      )}
                    </Box>
                  </Tooltip>
                </Paper>
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
                <Paper key={item.name} className={classes.paper} elevation={8}>
                  <Tooltip title={item.name}>
                    <Box
                      className={classes.box}
                      sx={{
                        backgroundColor: item.color,
                      }}
                      onClick={() => handleClick({ theme: item.name })}
                    >
                      {settings?.theme === item.name && (
                        <CheckIcon
                          sx={(theme) => ({
                            color: theme.palette.getContrastText(item.color),
                            stroke: theme.palette.getContrastText(
                              theme.palette.background.default,
                            ),
                            strokeWidth: 2,
                          })}
                        />
                      )}
                    </Box>
                  </Tooltip>
                </Paper>
              ))}
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ maxWidth: '320px', padding: 3 }}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography fontWeight={'medium'}>
              <Trans>Language</Trans>:
            </Typography>
            <ToggleButtonGroup value={settings?.language}>
              <ToggleButton
                value={'en'}
                onClick={() => handleClick({ language: 'en' })}
              >
                <Trans>English</Trans>
              </ToggleButton>
              <ToggleButton
                value={'pl'}
                onClick={() => handleClick({ language: 'pl' })}
              >
                <Trans>Polish</Trans>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
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
          <Box display="flex" gap={2} alignItems="center">
            <Typography fontWeight={'medium'}>
              <Trans>Reminder</Trans>:
            </Typography>
            <ToggleButtonGroup value={settings?.reminder}>
              <ToggleButton
                value={3}
                onClick={() => handleClick({ reminder: 3 })}
              >
                3 <Trans>Days</Trans>
              </ToggleButton>
              <ToggleButton
                value={1}
                onClick={() => handleClick({ reminder: 1 })}
              >
                1 <Trans>Day</Trans>
              </ToggleButton>
              <ToggleButton
                value={0}
                onClick={() => handleClick({ reminder: 0 })}
              >
                <Trans>None</Trans>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Typography variant="caption" color="text.secondary">
            <Trans>Applied changes will be visible tomorrow</Trans>
          </Typography>
        </Paper>

        <Paper sx={{ maxWidth: '350px', padding: 3 }}>
          <Typography fontWeight={'medium'}>
            <Trans>Routes</Trans>:
          </Typography>
          {Object.entries(settings!.routes).map(([routeName, isChecked]) => (
            <CheckboxOption
              key={routeName}
              name={routeName}
              checked={isChecked}
              onClick={() =>
                handleClick({
                  routes: { ...settings!.routes, [routeName]: !isChecked },
                })
              }
            />
          ))}
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
