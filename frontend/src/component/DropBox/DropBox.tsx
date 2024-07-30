import { alpha, Box } from '@mui/material';

export const DropBox = () => (
  <Box
    sx={(theme) => ({
      width: '100%',
      height: '50px',
      backgroundColor: theme.palette.action.hover,
      borderRadius: 2,
      border: '2px dashed',
      borderColor: alpha(theme.palette.action.hover, 0.25),
    })}
  ></Box>
);
