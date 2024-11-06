import { Trans } from '@lingui/macro';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import HomeIcon from '@mui/icons-material/Home';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
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
import { NavLink, useLocation } from 'react-router-dom';
import { SIDEBAR_WIDTH } from '~/config/constants';

type DrawerProps = {
  link: string;
  children: React.ReactNode;
  tooltip: string | React.ReactNode;
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

type RouterProps = {
  routes: { [routeName: string]: boolean };
};

export const Sidebar = ({ routes }: RouterProps) => {
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
          <DrawerLink link="/home" tooltip={<Trans>Home</Trans>}>
            <HomeIcon />
          </DrawerLink>
          <DrawerLink link="/dashboard" tooltip={<Trans>Dashboard</Trans>}>
            <DashboardCustomizeIcon />
          </DrawerLink>
          <Divider />

          {routes['Notes'] && (
            <DrawerLink link="/notes" tooltip={<Trans>Notes</Trans>}>
              <InsertDriveFileIcon />
            </DrawerLink>
          )}

          {routes['Calendar'] && (
            <DrawerLink link="/calendar" tooltip={<Trans>Calendar</Trans>}>
              <CalendarMonthIcon />
            </DrawerLink>
          )}

          {routes['Todo'] && (
            <DrawerLink link="/todo" tooltip={<Trans>To Do</Trans>}>
              <CheckBoxOutlinedIcon />
            </DrawerLink>
          )}

          {routes['Projects'] && (
            <DrawerLink link="/projects" tooltip={<Trans>Projects</Trans>}>
              <ViewKanbanIcon />
            </DrawerLink>
          )}

          <Divider />

          {routes['Group Projects'] && (
            <>
              <DrawerLink link="/group" tooltip={<Trans>Group Projects</Trans>}>
                <PersonIcon />
              </DrawerLink>
              <Divider />
            </>
          )}
        </List>
      </Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
        <DrawerLink link="/settings" tooltip={<Trans>Settings</Trans>}>
          <SettingsIcon />
        </DrawerLink>
        <DrawerLink link="/logout" tooltip={<Trans>Logout</Trans>}>
          <LogoutIcon />
        </DrawerLink>
      </List>
    </Drawer>
  );
};
