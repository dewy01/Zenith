import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout = () => {
  return (
    <Box display="flex" height="100vh">
      <Box>
        <Sidebar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};
