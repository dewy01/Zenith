import { Box, Typography } from '@mui/material';
import { getMyAccount } from '~/api/User/query';
import { Clock } from '~/component/Clock';
import { NotificationBox } from '~/component/NotificationBox';
import { UserBox } from '~/component/UserBox';
import { LoadingView } from '../LoadingView/LoadingView';

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
      overflow={'auto'}
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
        <Box sx={{ minWidth: '50vw' }}>
          <NotificationBox />
        </Box>
      </Box>
    </Box>
  );
};
