import { ListItem, ListItemText } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

type DrawerProps = {
  link: string;
  children: React.ReactNode;
};

export const DrawerLink = ({ link, children }: DrawerProps) => {
  const location = useLocation();
  const isActive = location.pathname.includes(link);
  return (
    <NavLink to={link} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItem
        disablePadding
        sx={(theme) => ({
          backgroundColor: isActive ? theme.palette.action.focus : "",
          display: "flex",
          borderRadius: "5px",
        })}
      >
        <ListItemText>{children}</ListItemText>
      </ListItem>
    </NavLink>
  );
};
