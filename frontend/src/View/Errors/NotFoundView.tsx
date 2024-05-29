import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Trans } from '@lingui/macro';

export const NotFoundView = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <HelpOutlineIcon color="error" sx={{ fontSize: 128, opacity: '0.7' }} />
      <Typography variant="h5">
        <Trans>View not found</Trans>
      </Typography>
      <Button component={NavLink} to="/home" variant="text">
        <Trans>Return</Trans>
      </Button>
    </Box>
  );
};
