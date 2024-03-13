import { Drawer, DrawerProps } from '@mui/material';
import { SIDEBAR_WIDTH } from '~/config/constants';

export const SubDrawer = ({ children, sx, ...rest }: DrawerProps) => {
  return (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ...sx,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 250,
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: 1,
          marginLeft: `${SIDEBAR_WIDTH}px`,
          padding: 1,
        },
      }}
      variant="permanent"
      anchor="left"
      {...rest}
    >
      {children}
    </Drawer>
  );
};
