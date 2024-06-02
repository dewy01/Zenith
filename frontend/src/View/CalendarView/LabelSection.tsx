import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  useTheme,
  Typography,
} from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import { z } from 'zod';
import { colorSchema } from './schema';
import { Trans, t } from '@lingui/macro';

interface Color {
  name: string;
  internalKey: string;
  colorKey: string;
}

interface Props {
  control: Control<z.infer<typeof colorSchema>>;
}

export const LabelSection = ({ control }: Props) => {
  const theme = useTheme();
  const colors: Color[] = [
    {
      name: t({ message: 'Purple' }),
      internalKey: 'Purple',
      colorKey: theme.palette.secondary.dark,
    },
    {
      name: t({ message: 'Red' }),
      internalKey: 'Red',
      colorKey: theme.palette.error.dark,
    },
    {
      name: t({ message: 'Green' }),
      internalKey: 'Green',
      colorKey: theme.palette.success.dark,
    },
    {
      name: t({ message: 'Blue' }),
      internalKey: 'Blue',
      colorKey: theme.palette.info.dark,
    },
    {
      name: t({ message: 'Yellow' }),
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
          {colors.map((color) => (
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
