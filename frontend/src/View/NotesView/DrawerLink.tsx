import { ListItem, ListItemText } from "@mui/material";

type DrawerProps = {
  isActive: boolean;
  children: React.ReactNode;
};

export const DrawerLink = ({ isActive, children }: DrawerProps) => {
  return (
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
  );
};
