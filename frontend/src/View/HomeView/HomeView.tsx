import { Box, Typography } from '@mui/material';
import { getMyAccount } from '~/api/User/query';
import { Clock } from '~/component/Clock';
import { NotificationBox } from '~/component/NotificationBox';
import { LoadingView } from '../LoadingView/LoadingView';
import { UserBox } from '~/component/UserBox';

export const HomeView = () => {
  const today = new Date().toLocaleDateString();
  const { data: user, isLoading } = getMyAccount();

  if (isLoading || user === undefined) {
    return <LoadingView />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={8}
      gap={6}
      height={'100vh'}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Clock />
          <Typography>{today}</Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={8}>
        <UserBox user={user} />
      </Box>
      <Box display={'flex'} gap={8} sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: '40vw' }}>
          <NotificationBox />
        </Box>

        {/* <Paper
          elevation={2}
          sx={{
            padding: 2,
            flexGrow: 1,
            width: '25vw',
            minWidth: '20vw',
            maxHeight: '45vh',
            maxWidth: '25vw',
          }}
        >
          <Box
            textAlign={'center'}
            sx={{ paddingBottom: 1.5, borderBottom: '1px solid' }}
          >
            <Typography fontWeight={500} fontSize={18}>
              Scratch pad
            </Typography>
          </Box>
          <Box padding={2}>
            dsa sdasda sd
            <samp>sdasda</samp>
          </Box>
        </Paper> */}
      </Box>
    </Box>
  );
};
