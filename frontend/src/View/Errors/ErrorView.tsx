import { Box, Button, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";

const handleError = (error: Error | string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return error;
};

export const ErrorView = () => {
  const error = useRouteError() as string;

  const refresh = () => location.reload();

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
      <BlockIcon color="error" sx={{ fontSize: 128, opacity: "0.7" }} />
      <Typography variant="h5">Unexpected Error:</Typography>
      <Typography variant="h6">{handleError(error)}</Typography>
      <Button onClick={refresh}>Try again</Button>
    </Box>
  );
};
