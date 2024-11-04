import CheckIcon from '@mui/icons-material/Check';
import { Box, ClassNameMap, Paper, Tooltip } from '@mui/material';
import { Settings } from '~/api/Settings/api';
import { newSettingsProps } from '../SettingsView';

type Props = {
  name: string;
  value: string;
  color: string;
  classes: ClassNameMap<'paper' | 'box'>;
  handleClick: (newSettings: newSettingsProps) => void;
  settings: Settings | undefined;
};

export const ThemeSection = ({
  name,
  value,
  color,
  classes,
  settings,
  handleClick,
}: Props) => {
  return (
    <Paper key={name} className={classes.paper} elevation={8}>
      <Tooltip title={name}>
        <Box
          className={classes.box}
          sx={{
            backgroundColor: color,
          }}
          onClick={() => handleClick({ theme: value })}
        >
          {settings?.theme === value && (
            <CheckIcon
              sx={(theme) => ({
                color: theme.palette.getContrastText(color),
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
  );
};
