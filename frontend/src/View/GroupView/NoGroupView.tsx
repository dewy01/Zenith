import { Box, Button, Divider, TextField, Typography } from '@mui/material';

export const NoGroupView = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={10}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">No group found</Typography>
        <Box display="flex" gap={5}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>Join a group</Typography>
            <TextField label="Code"></TextField>
            <Button variant="contained">Join</Button>
          </Box>
          <Divider orientation="vertical" />
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>Create a group</Typography>
            <TextField label="Name"></TextField>
            <Button variant="contained">Create</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
