import { Box, Paper, Typography } from '@mui/material';
import { MyAccount } from '~/api/User/api';
import { Trans } from '@lingui/macro';
import { DialogUpdate } from './DialogUpdate';
import { AvatarForm } from './AvatarForm';
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
        <DialogUpdate user={user} />
        <Box display="flex" gap={1} alignItems="center">
          <Typography
            sx={(theme) => ({
              backgroundColor: theme.palette.action.focus,
              padding: 0.5,
              borderRadius: 1,
            })}
            fontWeight={500}
          >
            <Trans>Username</Trans>:
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
            <Trans>Email</Trans>:
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
            <Trans>Group</Trans>
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
              <Trans>Name</Trans>:
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
              <Trans>Avatar</Trans>:
            </Typography>
            <AvatarForm username={user.username} initialImage={user.image} />
          </Box>
        </Paper>
      )}
    </>
  );
};
