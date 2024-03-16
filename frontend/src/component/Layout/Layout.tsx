import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';

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
        <Outlet />
      </Box>
    </Box>
  );
};
