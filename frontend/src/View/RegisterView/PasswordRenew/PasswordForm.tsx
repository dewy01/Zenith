import { Box, Button, TextField, Typography } from '@mui/material';
import { UseFormReturn, useController, useForm } from 'react-hook-form';
import {
  forgotPasswordModel,
  forgotPasswordSchema,
  resetPasswordModel,
} from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSection } from './EmailSection';
import { mutateForgotPassword } from '~/api/User/query';
import { Trans } from '@lingui/react';

type Props = {
  onSubmit: (value: resetPasswordModel) => void;
  formContext: UseFormReturn<resetPasswordModel>;
};

export const PasswordForm = ({ onSubmit, formContext }: Props) => {
  const passwordForm = useForm<forgotPasswordModel>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutateAsync: sendForgot } = mutateForgotPassword();
  const handleSubmitPassword = (data: forgotPasswordModel) => {
    sendForgot(data);
    passwordForm.reset();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const resetToken = useController({
    control: control,
    name: 'resetToken',
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
    <Box display="flex" flexDirection="column" gap={2} sx={{ paddingTop: 1 }}>
      <Box display="flex" gap={2}>
        <EmailSection
          formContext={passwordForm}
          onSubmit={handleSubmitPassword}
        />
        <Button variant="contained" type="submit" form="forgotForm">
          <Trans id="Send Code">Send Code</Trans>
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography>
          <Trans id="Input new data">Input new data</Trans>
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          id="resetForm"
          component="form"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <TextField
            label={<Trans id="Token">Token</Trans>}
            ref={resetToken.field.ref}
            onChange={resetToken.field.onChange}
            onBlur={resetToken.field.onBlur}
            name={resetToken.field.name}
            error={errors.resetToken !== undefined}
            helperText={errors.resetToken?.message}
          />
          <TextField
            label={<Trans id="Password">Password</Trans>}
            type="password"
            ref={password.field.ref}
            onChange={password.field.onChange}
            onBlur={password.field.onBlur}
            name={password.field.name}
            error={errors.password !== undefined}
            helperText={errors.password?.message}
          />
          <TextField
            label={<Trans id="Confirm Password">Confirm Password</Trans>}
            type="password"
            ref={passwordConfirm.field.ref}
            onChange={passwordConfirm.field.onChange}
            onBlur={passwordConfirm.field.onBlur}
            name={passwordConfirm.field.name}
            error={errors.passwordConfirm !== undefined}
            helperText={errors.passwordConfirm?.message}
          />
        </Box>
      </Box>
    </Box>
  );
};
