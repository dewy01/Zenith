import { Box, TextField } from '@mui/material';
import { todoModel } from './schema';
import { UseFormReturn, useController } from 'react-hook-form';

type Props = {
  onSubmit: (value: todoModel) => void;
  formContext: UseFormReturn<todoModel>;
};

export const CreateForm = ({ onSubmit, formContext }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formContext;

  const title = useController({
    control: control,
    name: 'title',
  });

  const desc = useController({
    control: control,
    name: 'description',
  });

  return (
    <Box
      component="form"
      id="createTodoForm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '400px',
        paddingTop: 1,
        gap: 2,
      }}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <TextField
        fullWidth
        label="Title"
        ref={title.field.ref}
        value={title.field.value}
        onChange={title.field.onChange}
        onBlur={title.field.onBlur}
        name={title.field.name}
        error={errors.title !== undefined}
        helperText={errors.title?.message}
      />

      <TextField
        fullWidth
        label="Description"
        ref={desc.field.ref}
        value={desc.field.value}
        onChange={desc.field.onChange}
        onBlur={desc.field.onBlur}
        name={desc.field.name}
        error={errors.description !== undefined}
        helperText={errors.description?.message}
      />
    </Box>
  );
};
