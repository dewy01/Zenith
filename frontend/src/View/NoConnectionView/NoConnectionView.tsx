import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Trans } from '@lingui/react';

export const NoConnectionView = () => {
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
      <CloudOffIcon color="inherit" sx={{ fontSize: 128, opacity: '0.7' }} />
      <Typography variant="h5">
        <Trans id="Connection not established">
          Connection not established
        </Trans>
      </Typography>
      <Button component={NavLink} to="/home" variant="text">
        <Trans id="Retry">Retry</Trans>
      </Button>
      <Button component={NavLink} to="/logout" variant="text">
        <Trans id="Logout">Logout</Trans>
      </Button>
    </Box>
  );
};
