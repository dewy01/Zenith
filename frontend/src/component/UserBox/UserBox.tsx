import { Avatar, Box, Paper, Typography } from '@mui/material';
import { MyAccount } from '~/api/User/api';
import { stringAvatar } from '~/utils/userAvatar';
import { Trans } from '@lingui/react';

type Props = {
  user: MyAccount;
};

export const UserBox = ({ user }: Props) => {
  return (
    <>
      <Paper
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'start',
          flexGrow: 0,
          maxWidth: 'fit-content',
          gap: 1.5,
        }}
        elevation={2}
      >
        <Typography variant="h5">
          <Trans id="Account">Account</Trans>
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Typography
            sx={(theme) => ({
              backgroundColor: theme.palette.action.focus,
              padding: 0.5,
              borderRadius: 1,
            })}
            fontWeight={500}
          >
            <Trans id="Username">Username</Trans>:
          </Typography>
          <Typography>{user?.username}</Typography>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Typography
            sx={(theme) => ({
              backgroundColor: theme.palette.action.focus,
              padding: 0.5,
              borderRadius: 1,
            })}
            fontWeight={500}
          >
            <Trans id="Email">Email</Trans>:
          </Typography>
          <Typography>{user?.email}</Typography>
        </Box>
      </Paper>
      {user.groupName && (
        <Paper
          sx={{
            padding: 3,
            display: 'flex',
            minWidth: 250,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'start',
            flexGrow: 0,
            maxWidth: 'fit-content',
            gap: 1.5,
          }}
          elevation={2}
        >
          <Typography variant="h5">
            <Trans id="Group">Group</Trans>
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography
              sx={(theme) => ({
                backgroundColor: theme.palette.action.focus,
                padding: 0.5,
                borderRadius: 1,
              })}
              fontWeight={500}
            >
              <Trans id="Name">Name</Trans>:
            </Typography>
            <Typography>{user?.groupName}</Typography>
          </Box>
          <Box display="flex" gap={1} alignItems={'center'}>
            <Typography
              sx={(theme) => ({
                backgroundColor: theme.palette.action.focus,
                padding: 0.5,
                borderRadius: 1,
              })}
              fontWeight={500}
            >
              <Trans id="Avatar">Avatar</Trans>:
            </Typography>
            <Avatar
              {...stringAvatar(user.username)}
              style={{ width: 35, height: 35 }}
            />
          </Box>
        </Paper>
      )}
    </>
  );
};
