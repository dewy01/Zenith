import { Box, TextField } from '@mui/material';
import { groupModel } from './schema';
import { UseFormReturn, useController } from 'react-hook-form';
import { Trans } from '@lingui/macro';

type Props = {
  onSubmit: (value: groupModel) => void;
  formContext: UseFormReturn<groupModel>;
};

export const CreateForm = ({ onSubmit, formContext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const groupName = useController({
    control: control,
    name: 'groupName',
  });

  return (
    <Box
      component="form"
      id="groupForm"
      sx={{ paddingTop: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label={<Trans>Group name</Trans>}
        ref={groupName.field.ref}
        value={groupName.field.value}
        onChange={groupName.field.onChange}
        onBlur={groupName.field.onBlur}
        name={groupName.field.name}
        error={errors.groupName !== undefined}
        helperText={errors.groupName?.message}
      />
    </Box>
  );
};
