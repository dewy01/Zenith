import { UseFormReturn, useController } from 'react-hook-form';
import { forgotPasswordModel } from './schema';
import { Box, TextField } from '@mui/material';
import { Trans } from '@lingui/macro';

type Props = {
  onSubmit: (value: forgotPasswordModel) => void;
  formContext: UseFormReturn<forgotPasswordModel>;
};

export const EmailSection = ({ onSubmit, formContext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const email = useController({
    control: control,
    name: 'email',
  });

  return (
    <Box
      id="forgotForm"
      component="form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <TextField
        label={<Trans>Email</Trans>}
        ref={email.field.ref}
        onChange={email.field.onChange}
        onBlur={email.field.onBlur}
        name={email.field.name}
        error={errors.email !== undefined}
        helperText={errors.email?.message}
      />
    </Box>
  );
};
