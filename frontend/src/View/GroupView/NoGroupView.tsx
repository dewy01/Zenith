import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { mutateAddGroup } from '~/api/Group/query';

export const NoGroupView = () => {
  const { mutateAsync: AddGroup } = mutateAddGroup();

  const [group, setGroup] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };
  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
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
            <TextField onChange={handleGroupChange} label="Name"></TextField>
            <Button
              onClick={() => AddGroup({ groupName: group })}
              variant="contained"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
