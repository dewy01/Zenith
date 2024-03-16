import {
  AppBar,
  Box,
  Checkbox,
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
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Settings</Typography>
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
            <ToggleButtonGroup value={'en'}>
              <ToggleButton value={'en'}>English</ToggleButton>
              <ToggleButton value={'pl'}>Polish</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>
        <Paper sx={{ maxWidth: '370px', padding: 3 }}>
          <Box display="flex" gap={2} alignItems="center">
            <Typography fontWeight={'medium'}>Reminder:</Typography>
            <ToggleButtonGroup value={3}>
              <ToggleButton value={3}>3 Days</ToggleButton>
              <ToggleButton value={1}>1 Day</ToggleButton>
              <ToggleButton value={0}>None</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Paper>

        <Paper sx={{ maxWidth: '350px', padding: 3 }}>
          <Typography fontWeight={'medium'}>Routes:</Typography>
          <Box display="flex" alignItems="center">
            <Checkbox />
            <Typography>Notes</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox />
            <Typography>Calendar</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox />
            <Typography>To Do</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox />
            <Typography>Projects</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox />
            <Typography>Group Projects</Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
