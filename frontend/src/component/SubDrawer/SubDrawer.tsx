import { Drawer, DrawerProps } from "@mui/material";

export const SubDrawer = ({ children, sx, ...rest }: DrawerProps) => {
  return (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        ...sx,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 200,
          overflowX: "hidden",
          display: "flex",
          justifyContent: "space-between",
          flexGrow: 1,
          marginLeft: "58px",
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
