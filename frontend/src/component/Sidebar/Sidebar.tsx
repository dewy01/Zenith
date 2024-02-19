import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 58;

type DrawerProps = {
  link: string;
  children: React.ReactNode;
};

const DrawerLink = ({ link, children }: DrawerProps) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <NavLink to={link} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem
        disablePadding
        sx={(theme) => ({
          backgroundColor: isActive ? theme.palette.grey[900] : "",
          display: "flex",
        })}
      >
        <ListItemButton>
          <ListItemIcon>{children}</ListItemIcon>
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          overflowX: "hidden",
          display: "flex",
          justifyContent: "space-between",
        },
      }}
      open
    >
      <Box>
        <Toolbar></Toolbar>
        <Divider />
        <List sx={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
          <DrawerLink link="/home">
            <HomeIcon />
          </DrawerLink>

          <DrawerLink link="/projects">
            <CheckBoxOutlinedIcon />
          </DrawerLink>

          <DrawerLink link="/calendar">
            <CalendarMonthIcon />
          </DrawerLink>

          <DrawerLink link="/notes">
            <InsertDriveFileIcon />
          </DrawerLink>

          <DrawerLink link="/kanban">
            <ViewKanbanIcon />
          </DrawerLink>

          <DrawerLink link="/groups">
            <PersonIcon />
          </DrawerLink>
        </List>
        <Divider />
      </Box>
      <List>
        <DrawerLink link="/settings">
          <SettingsIcon />
        </DrawerLink>
      </List>
    </Drawer>
  );
};
