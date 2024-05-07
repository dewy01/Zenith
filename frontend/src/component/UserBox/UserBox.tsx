import { Box, Paper, Typography } from '@mui/material';
import { MyAccount } from '~/api/User/api';

type Props = {
  user: MyAccount;
};

export const UserBox = ({ user }: Props) => {
  return (
    <Paper
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'start',
        flexGrow: 0,
        maxWidth: 'fit-content',
      }}
      elevation={2}
    >
      <Box display="flex" gap={1}>
        <Typography fontWeight={500}>Username:</Typography>
        <Typography fontWeight={300}>{user?.username}</Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Typography fontWeight={500}>Email:</Typography>
        <Typography fontWeight={300}>{user?.email}</Typography>
      </Box>
      {user.groupName && (
        <Box display="flex" gap={1}>
          <Typography fontWeight={500}>Group:</Typography>
          <Typography fontWeight={300}>{user?.groupName}</Typography>
        </Box>
      )}
    </Paper>
  );
};
