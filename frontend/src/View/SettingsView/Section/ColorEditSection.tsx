import { Trans, t } from '@lingui/macro';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Settings } from '~/api/Settings/api';
import { newSettingsProps } from '../SettingsView';

interface ColorEditSectionProps {
  settings: Settings | undefined;
  handleClick: (newSettings: newSettingsProps) => void;
}

export const ColorEditSection = ({
  settings,
  handleClick,
}: ColorEditSectionProps) => {
  const theme = useTheme();

  const [localColors, setLocalColors] = useState<{ [key: string]: string }>(
    settings?.colors || {},
  );

  const colorMap = [
    {
      label: localColors['Purple'] || t({ message: 'Purple' }),
      key: 'Purple',
      color: theme.palette.secondary.dark,
    },
    {
      label: localColors['Red'] || t({ message: 'Red' }),
      key: 'Red',
      color: theme.palette.error.dark,
    },
    {
      label: localColors['Green'] || t({ message: 'Green' }),
      key: 'Green',
      color: theme.palette.success.dark,
    },
    {
      label: localColors['Blue'] || t({ message: 'Blue' }),
      key: 'Blue',
      color: theme.palette.info.dark,
    },
    {
      label: localColors['Yellow'] || t({ message: 'Yellow' }),
      key: 'Yellow',
      color: theme.palette.warning.dark,
    },
  ];

  const handleLocalColorChange = (key: string, newLabel: string) => {
    setLocalColors((prevColors) => ({
      ...prevColors,
      [key]: newLabel,
    }));
  };

  const handleSaveClick = () => {
    handleClick({ colors: localColors });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} padding={2}>
      <Typography variant="h6">
        <Trans>Edit Colors</Trans>
      </Typography>
      {colorMap.map((color) => (
        <Box
          key={color.key}
          display="flex"
          alignItems="center"
          gap={1}
          marginBottom={1}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              backgroundColor: color.color,
              marginRight: 1,
            }}
          />
          <TextField
            variant="outlined"
            size="small"
            value={color.label}
            onChange={(e) => handleLocalColorChange(color.key, e.target.value)}
          />
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSaveClick}>
        <Trans>Save</Trans>
      </Button>
    </Box>
  );
};
