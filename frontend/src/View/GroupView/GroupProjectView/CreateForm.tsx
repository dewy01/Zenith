import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { groupProjectModel } from './schema';
import { Controller, UseFormReturn, useController } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Trans } from '@lingui/react';

type Props = {
  onSubmit: (value: groupProjectModel) => void;
  formContext: UseFormReturn<groupProjectModel>;
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

  const deadline = useController({
    control: control,
    name: 'deadline',
  });

  const status = useController({
    control: control,
    name: 'status',
  });

  return (
    <Box
      component="form"
      id="groupProjectForm"
      sx={{ paddingTop: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Box display={'flex'} gap={1}>
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
          <FormControl sx={{ width: '240px' }}>
            <InputLabel>
              <Trans id="Status">Status</Trans>
            </InputLabel>
            <Select
              label={<Trans id="Status">Status</Trans>}
              name={status.field.name}
              value={status.field.value}
              onChange={status.field.onChange}
              onBlur={status.field.onBlur}
              inputRef={status.field.ref}
            >
              <MenuItem value="on Hold">
                <Trans id="on Hold">on Hold</Trans>
              </MenuItem>
              <MenuItem value="in Progress">
                <Trans id="in Progress">in Progress</Trans>
              </MenuItem>
              <MenuItem value="Done">
                <Trans id="Done">Done</Trans>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          name={deadline.field.name}
          control={control}
          render={() => (
            <DatePicker
              slotProps={{
                textField: {
                  error: errors.deadline !== undefined,
                  helperText: errors.deadline?.message ?? undefined,
                },
              }}
              label={<Trans id="Deadline">Deadline</Trans>}
              value={deadline.field.value}
              onChange={deadline.field.onChange}
              disablePast
              name="Deadline"
            />
          )}
        />
      </Box>
    </Box>
  );
};
