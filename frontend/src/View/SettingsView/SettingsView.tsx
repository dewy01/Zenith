import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { getSettings, mutateEditSettings } from '~/api/Settings/query';
import { LoadingView } from '../LoadingView/LoadingView';
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@mui/styles';

const colors = [
  { name: 'blue', color: '#5AB4CF' },
  { name: 'purple', color: '#B680BC' },
  { name: 'green', color: '#5BD35B' },
  { name: 'red', color: '#FD3C3C' },
];
const themeColor = [
  { name: 'light', color: '#f1f1f1' },
  { name: 'dark', color: '#000000' },
];

const languages = [
  { name: 'English', value: 'en' },
  { name: 'Polish', value: 'pl' },
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

export const SettingsView = () => {
  const { data: settings, isLoading } = getSettings();
  const { mutateAsync } = mutateEditSettings();
  const classes = useStyles();

  if (isLoading && !settings) {
    return <LoadingView />;
  }

  return (
    <Box
      sx={(theme) => ({
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3),
        gap: 2,
      })}
    >
      <AppBar position="static" sx={{ borderRadius: '5px' }}>
        <Toolbar>
          <Typography variant="h6">Settings</Typography>
        </Toolbar>
      </AppBar>
      <Paper sx={{ maxWidth: '370px', padding: 3 }}>
        <Box display="flex" gap={2} alignItems="center">
          <Typography fontWeight={'medium'}>Primary color:</Typography>
          <Box display="flex" gap={1}>
            {colors.map((item) => (
              <Paper key={item.name} className={classes.paper} elevation={8}>
                <Tooltip title={item.name}>
                  <Box
                    className={classes.box}
                    sx={{
                      backgroundColor: item.color,
                    }}
                    onClick={() => {
                      mutateAsync({
                        theme: settings ? settings.theme : 'dark',
                        color: item.name,
                      });
                    }}
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
          <Typography fontWeight={'medium'}>Background color:</Typography>
          <Box display="flex" gap={1}>
            {themeColor.map((item) => (
              <Paper key={item.name} className={classes.paper} elevation={8}>
                <Tooltip title={item.name}>
                  <Box
                    className={classes.box}
                    sx={{
                      backgroundColor: item.color,
                    }}
                    onClick={() => {
                      mutateAsync({
                        theme: item.name,
                        color: settings ? settings.color : 'blue',
                      });
                    }}
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
          <Typography fontWeight={'medium'}>Language:</Typography>
          <Box display="flex" gap={1}>
            {languages.map((item) => (
              <Paper key={item.name} className={classes.paper} elevation={8}>
                <Tooltip title={item.name}>
                  <Box className={classes.box} onClick={() => {}}>
                    <Typography>{item.value}</Typography>
                  </Box>
                </Tooltip>
              </Paper>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
