import { Search } from '@mui/icons-material';
import {
  TextField,
  alpha,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import { InputHTMLAttributes, forwardRef } from 'react';

export const SearchField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ InputProps, ...rest }, ref) => {
    return (
      <TextField
        ref={ref}
        {...rest}
        sx={[
          (theme) => ({
            color: 'white',
            '.MuiInputBase-root': {
              color: 'inherit',
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              boxShadow: 'none',
            },
            svg: {
              color: theme.palette.action.disabled,
            },
          }),
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
  },
);
