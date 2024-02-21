import { Search } from "@mui/icons-material";
import {
  TextField,
  alpha,
  InputAdornment,
  TextFieldProps,
} from "@mui/material";

export const SearchField = ({ sx, InputProps, ...rest }: TextFieldProps) => {
  return (
    <TextField
      {...rest}
      sx={[
        (theme) => ({
          color: "white",
          ".MuiInputBase-root": {
            color: "inherit",
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            boxShadow: "none",
          },
          svg: {
            color: theme.palette.action.disabled,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      size="small"
      autoComplete="off"
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
