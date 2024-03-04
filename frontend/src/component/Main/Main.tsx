import { Box, BoxProps } from "@mui/material";

export const Main = ({ children, sx, ...rest }: BoxProps) => {
  return (
    <Box
      sx={(theme) => ({
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(3),
        paddingLeft: theme.spacing(28),
      })}
      {...rest}
    >
      {children}
    </Box>
  );
};
