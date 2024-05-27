import { Box, TextField } from '@mui/material';
import { projectModel } from './schema';
import { Controller, UseFormReturn, useController } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';
import { Trans } from '@lingui/react';

type Props = {
  onSubmit: (value: projectModel) => void;
  formContext: UseFormReturn<projectModel>;
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

  const color = useController({
    control: control,
    name: 'color',
  });

  return (
    <Box
      component="form"
      id="createTodoProjectForm"
      sx={{ paddingTop: 1 }}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <TextField
          label={<Trans id="Title">Title</Trans>}
          ref={title.field.ref}
          value={title.field.value}
          onChange={title.field.onChange}
          onBlur={title.field.onBlur}
          name={title.field.name}
          error={errors.title !== undefined}
          helperText={errors.title?.message}
        />

        <TextField
          label={<Trans id="Description">Description</Trans>}
          ref={desc.field.ref}
          value={desc.field.value}
          onChange={desc.field.onChange}
          onBlur={desc.field.onBlur}
          name={desc.field.name}
          error={errors.description !== undefined}
          helperText={errors.description?.message}
        />
        <Controller
          name={color.field.name}
          control={control}
          render={() => (
            <HexColorPicker
              style={{
                width: '500px',
              }}
              color={color.field.value}
              onChange={color.field.onChange}
              onBlur={color.field.onBlur}
            />
          )}
        />
      </Box>
    </Box>
  );
};
