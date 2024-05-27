import { Trans } from '@lingui/react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { mutateAddGroup, mutateJoinGroup } from '~/api/Group/query';

export const NoGroupView = () => {
  const { mutateAsync: AddGroup } = mutateAddGroup();
  const { mutateAsync: JoinGroup } = mutateJoinGroup();

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
        <Typography variant="h5">
          <Trans id="No group found">No group found</Trans>
        </Typography>
        <Box display="flex" gap={5}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>Join a group</Typography>
            <TextField onChange={handleTokenChange} label="Code"></TextField>
            <Button
              onClick={() => JoinGroup({ token: token })}
              variant="contained"
            >
              <Trans id="Join">Join</Trans>
            </Button>
          </Box>
          <Divider orientation="vertical" />
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              <Trans id="Create a group">Create a group</Trans>
            </Typography>
            <TextField onChange={handleGroupChange} label="Name"></TextField>
            <Button
              onClick={() => AddGroup({ groupName: group })}
              variant="contained"
            >
              <Trans id="Create">Create</Trans>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
