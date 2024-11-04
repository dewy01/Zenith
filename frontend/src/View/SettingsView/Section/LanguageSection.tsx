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

export const LanguageSection = ({ settings, handleClick }: Props) => {
  return (
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
  );
};
