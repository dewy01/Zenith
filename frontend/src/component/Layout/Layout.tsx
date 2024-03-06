import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';

export const Layout = () => {
  return (
    <Box sx={{ display: 'flex', maxHeight: '100vh', minHeight: '100vh' }}>
      <Sidebar />
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
