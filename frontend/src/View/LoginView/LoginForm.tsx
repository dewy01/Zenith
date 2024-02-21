import { Box, Stack, TextField } from "@mui/material";
import { UseFormReturn, useController } from "react-hook-form";
import { loginFormSchema } from "./schema";

type loginFormProps = {
  onSubmit: (value: loginFormSchema) => void;
  formContext: UseFormReturn<loginFormSchema>;
};

export const FORM_ID = "login-form";

export const LoginForm = ({ onSubmit, formContext }: loginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const email = useController({
    control: control,
    name: "email",
  });
  const password = useController({
    control: control,
    name: "password",
  });

  return (
    <Box
      id={FORM_ID}
      component="form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <Stack gap={2}>
        <TextField
          sx={{ width: "240px" }}
          autoFocus
          label="Email"
          type="text"
          autoComplete="off"
          name={email.field.name}
          value={email.field.value}
          onChange={email.field.onChange}
          onBlur={email.field.onBlur}
          inputRef={email.field.ref}
          error={errors.email !== undefined}
          helperText={errors.email?.message ?? ""}
        />

        <TextField
          sx={{ width: "240px" }}
          label="Password"
          type="password"
          autoComplete="off"
          name={password.field.name}
          value={password.field.value}
          onChange={password.field.onChange}
          onBlur={password.field.onBlur}
          inputRef={password.field.ref}
          error={errors.password !== undefined}
          helperText={errors.password?.message ?? ""}
        />
      </Stack>
    </Box>
  );
};
