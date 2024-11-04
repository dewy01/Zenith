import { Trans } from '@lingui/macro';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Settings } from '~/api/Settings/api';
import { newSettingsProps } from '../SettingsView';

type Props = {
  handleClick: (newSettings: newSettingsProps) => void;
  settings: Settings | undefined;
};

export const ReminderSection = ({ settings, handleClick }: Props) => {
  return (
    <>
      <Box display="flex" gap={2} alignItems="center">
        <Typography fontWeight={'medium'}>
          <Trans>Reminder</Trans>:
        </Typography>
        <ToggleButtonGroup value={settings?.reminder}>
          <ToggleButton value={3} onClick={() => handleClick({ reminder: 3 })}>
            3 <Trans>Days</Trans>
          </ToggleButton>
          <ToggleButton value={1} onClick={() => handleClick({ reminder: 1 })}>
            1 <Trans>Day</Trans>
          </ToggleButton>
          <ToggleButton value={0} onClick={() => handleClick({ reminder: 0 })}>
            <Trans>None</Trans>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Typography variant="caption" color="text.secondary">
        <Trans>Applied changes will be visible tomorrow</Trans>
      </Typography>
    </>
  );
};
