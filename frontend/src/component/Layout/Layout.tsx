import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { Suspense } from 'react';

type RouterProps = {
  routes: { [routeName: string]: boolean };
};

export const Layout = ({ routes }: RouterProps) => {
  return (
    <Box sx={{ display: 'flex', maxHeight: '100vh', minHeight: '100vh' }}>
      <Sidebar routes={routes} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          flexGrow: 1,
          boxSizing: 'border-box',
          marginLeft: '58px',
        }}
      >
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};
