import { Box, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Trans } from '@lingui/macro';

export const NoNoteView = () => {
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
      <DescriptionIcon color="inherit" sx={{ fontSize: 128 }} />
      <Typography variant="h5">
        <Trans>No Note</Trans>
      </Typography>
      <Typography variant="body2">
        <Trans>Create a new note to see preview</Trans>
      </Typography>
    </Box>
  );
};
