import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Tooltip,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink, useLocation } from 'react-router-dom';
import { SIDEBAR_WIDTH } from '~/config/constants';

type DrawerProps = {
  link: string;
  children: React.ReactNode;
  tooltip: string;
};

const DrawerLink = ({ link, children, tooltip }: DrawerProps) => {
  const location = useLocation();
  const isActive = location.pathname.includes(link);
  return (
    <Tooltip title={tooltip} placement="right">
      <NavLink to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem
          disablePadding
          sx={(theme) => ({
            backgroundColor: isActive ? theme.palette.primary.main : '',
            display: 'flex',
          })}
        >
          <ListItemButton>
            <ListItemIcon
              sx={(theme) => ({
                color: isActive
                  ? theme.palette.background.default
                  : theme.palette.getContrastText(
                      theme.palette.background.default,
                    ),
              })}
            >
              {children}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </NavLink>
    </Tooltip>
  );
};

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: SIDEBAR_WIDTH,
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: 1,
        },
      }}
      open
    >
      <Box>
        <Toolbar></Toolbar>
        <Divider />
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
          <DrawerLink link="/home" tooltip="Home">
            <HomeIcon />
          </DrawerLink>

          <DrawerLink link="/notes" tooltip="Notes">
            <InsertDriveFileIcon />
          </DrawerLink>

          <DrawerLink link="/calendar" tooltip="Calendar">
            <CalendarMonthIcon />
          </DrawerLink>

          <DrawerLink link="/todo" tooltip="To Do">
            <CheckBoxOutlinedIcon />
          </DrawerLink>

          <DrawerLink link="/projects" tooltip="Projects">
            <ViewKanbanIcon />
          </DrawerLink>

          <Divider />

          <DrawerLink link="/groups" tooltip="Group Projects">
            <PersonIcon />
          </DrawerLink>

          <Divider />
        </List>
      </Box>
      <List>
        <DrawerLink link="/settings" tooltip="Settings">
          <SettingsIcon />
        </DrawerLink>
      </List>
    </Drawer>
  );
};
