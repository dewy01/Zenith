import { Trans, t } from '@lingui/macro';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';
import { colorSchema } from './schema';

interface Color {
  name: string;
  internalKey: string;
  colorKey: string;
}

interface Props {
  control: Control<z.infer<typeof colorSchema>>;
  colors: { [color: string]: string };
}

export const LabelSection = ({ control, colors }: Props) => {
  const theme = useTheme();
  const colorsMap: Color[] = [
    {
      name:
        colors['Purple'] === 'Purple'
          ? t({ message: 'Purple' })
          : colors['Purple'],
      internalKey: 'Purple',
      colorKey: theme.palette.secondary.dark,
    },
    {
      name: colors['Red'] === 'Red' ? t({ message: 'Red' }) : colors['Red'],
      internalKey: 'Red',
      colorKey: theme.palette.error.dark,
    },
    {
      name:
        colors['Green'] === 'Green' ? t({ message: 'Green' }) : colors['Green'],
      internalKey: 'Green',
      colorKey: theme.palette.success.dark,
    },
    {
      name: colors['Blue'] === 'Blue' ? t({ message: 'Blue' }) : colors['Blue'],
      internalKey: 'Blue',
      colorKey: theme.palette.info.dark,
    },
    {
      name:
        colors['Yellow'] === 'Yellow'
          ? t({ message: 'Yellow' })
          : colors['Yellow'],
      internalKey: 'Yellow',
      colorKey: theme.palette.warning.dark,
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      paddingLeft={2}
      gap={2}
    >
      <Typography variant="h6">
        <Trans>Filters</Trans>
      </Typography>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormGroup>
          {colorsMap.map((color) => (
            <FormControlLabel
              sx={(theme) => ({
                width: '100%',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              })}
              key={color.internalKey}
              control={
                <Controller
                  name={
                    `colors.${color.internalKey}` as
                      | 'colors.Purple'
                      | 'colors.Red'
                      | 'colors.Green'
                      | 'colors.Blue'
                      | 'colors.Yellow'
                  }
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={!!field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: 1,
                      backgroundColor: color.colorKey,
                      marginRight: 1,
                    }}
                  />
                  {color.name}
                </Box>
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
