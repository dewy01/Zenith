import { Box, CircularProgress } from '@mui/material';

export const LoadingView = () => {
  return (
    <Box
      sx={{ height: '90vh', zIndex: 9999999 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};
