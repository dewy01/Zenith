import { Trans } from '@lingui/macro';
import { Box, TextField, Typography } from '@mui/material';
import { UseFormReturn, useController } from 'react-hook-form';
import { PasswordField } from '../PasswordField';
import { userModel } from './schema';

type Props = {
  onSubmit: (value: userModel) => void;
  formContext: UseFormReturn<userModel>;
};

export const CreateForm = ({ onSubmit, formContext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const username = useController({
    control: control,
    name: 'username',
  });

  const email = useController({
    control: control,
    name: 'email',
  });

  const oldPassword = useController({
    control: control,
    name: 'oldPassword',
  });

  const password = useController({
    control: control,
    name: 'password',
  });

  const passwordConfirm = useController({
    control: control,
    name: 'passwordConfirm',
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      component="form"
      id="userForm"
      gap={2}
      sx={{ paddingTop: 1, minWidth: '300px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label={<Trans>Username</Trans>}
        ref={username.field.ref}
        value={username.field.value}
        onChange={username.field.onChange}
        onBlur={username.field.onBlur}
        name={username.field.name}
        error={errors.username !== undefined}
        helperText={errors.username?.message}
      />
      <TextField
        label={<Trans>Email</Trans>}
        ref={email.field.ref}
        value={email.field.value}
        onChange={email.field.onChange}
        onBlur={email.field.onBlur}
        name={email.field.name}
        error={errors.email !== undefined}
        helperText={errors.email?.message}
      />
      <PasswordField
        label={<Trans>Old password</Trans>}
        ref={oldPassword.field.ref}
        value={oldPassword.field.value}
        onChange={oldPassword.field.onChange}
        onBlur={oldPassword.field.onBlur}
        name={oldPassword.field.name}
        error={errors.oldPassword !== undefined}
        helperText={errors.oldPassword?.message}
      />
      <PasswordField
        label={<Trans>New password</Trans>}
        ref={password.field.ref}
        value={password.field.value}
        onChange={password.field.onChange}
        onBlur={password.field.onBlur}
        name={password.field.name}
        error={errors.password !== undefined}
        helperText={errors.password?.message}
      />
      <PasswordField
        label={<Trans>Confirm password</Trans>}
        ref={passwordConfirm.field.ref}
        value={passwordConfirm.field.value}
        onChange={passwordConfirm.field.onChange}
        onBlur={passwordConfirm.field.onBlur}
        name={passwordConfirm.field.name}
        error={errors.passwordConfirm !== undefined}
        helperText={errors.passwordConfirm?.message}
      />
      <Typography sx={{ opacity: 0.5 }} variant="caption">
        <Trans>Updating account will cause a logout</Trans>
      </Typography>
    </Box>
  );
};
