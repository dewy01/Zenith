import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const NotFoundView = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <HelpOutlineIcon color="error" sx={{ fontSize: 128, opacity: "0.7" }} />
      <Typography variant="h5">View not found</Typography>
      <Button component={NavLink} to="/home" variant="text">
        Return
      </Button>
    </Box>
  );
};
