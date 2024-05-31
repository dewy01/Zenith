import { Box, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Trans } from '@lingui/macro';

export const NoTodoView = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        opacity: '0.5',
      }}
    >
      <FormatListBulletedIcon color="inherit" sx={{ fontSize: 128 }} />
      <Typography variant="h5">
        <Trans>No Todo</Trans>
      </Typography>
      <Typography variant="body2">
        <Trans>Create a new todo to see preview</Trans>
      </Typography>
    </Box>
  );
};
