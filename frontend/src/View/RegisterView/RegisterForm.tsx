import { Box, Stack, TextField } from "@mui/material";
import { UseFormReturn, useController } from "react-hook-form";
import { registerFormSchema } from "./schema";

type registerFormProps = {
  onSubmit: (value: registerFormSchema) => void;
  formContext: UseFormReturn<registerFormSchema>;
};

export const FORM_ID = "register-form";

export const RegisterForm = ({ onSubmit, formContext }: registerFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const username = useController({
    control: control,
    name: "username",
  });
  const email = useController({
    control: control,
    name: "email",
  });
  const password = useController({
    control: control,
    name: "password",
  });
  const passwordConfirm = useController({
    control: control,
    name: "passwordConfirm",
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
          label="Username"
          autoFocus
          autoComplete="off"
          name={username.field.name}
          value={username.field.value}
          onChange={username.field.onChange}
          onBlur={username.field.onBlur}
          inputRef={username.field.ref}
          error={errors.username !== undefined}
          helperText={errors.username?.message ?? ""}
        />

        <TextField
          sx={{ width: "240px" }}
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

        <TextField
          sx={{ width: "240px" }}
          label="Confirm Password"
          type="password"
          autoComplete="off"
          name={passwordConfirm.field.name}
          value={passwordConfirm.field.value}
          onChange={passwordConfirm.field.onChange}
          onBlur={passwordConfirm.field.onBlur}
          inputRef={passwordConfirm.field.ref}
          error={errors.passwordConfirm !== undefined}
          helperText={errors.passwordConfirm?.message ?? ""}
        />
      </Stack>
    </Box>
  );
};
