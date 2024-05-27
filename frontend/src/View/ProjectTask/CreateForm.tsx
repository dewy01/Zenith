import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { taskModel } from './schema';
import { UseFormReturn, useController } from 'react-hook-form';
import { Trans } from '@lingui/react';

const categories = [
  'Note',
  'Email',
  'Meeting',
  'Research',
  'Design',
  'Development',
  'Maintenance',
];

type Props = {
  onSubmit: (value: taskModel) => void;
  formContext: UseFormReturn<taskModel>;
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

  const category = useController({
    control: control,
    name: 'category',
  });

  const status = useController({
    control: control,
    name: 'status',
  });

  return (
    <Box
      component="form"
      id="createtaskForm"
      sx={{ paddingTop: 1 }}
      onSubmit={handleSubmit((data) => onSubmit(data))}
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
              <MenuItem value="Backlog">
                <Trans id="Backlog">Backlog</Trans>
              </MenuItem>
              <MenuItem value="in Progress">
                <Trans id="InProgress">in Progress</Trans>
              </MenuItem>
              <MenuItem value="For Review">
                <Trans id="ForReview">For Review</Trans>
              </MenuItem>
              <MenuItem value="Closed">
                <Trans id="Closed">Closed</Trans>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          rows={8}
          multiline
          label={<Trans id="Description">Description</Trans>}
          ref={desc.field.ref}
          value={desc.field.value}
          onChange={desc.field.onChange}
          onBlur={desc.field.onBlur}
          name={desc.field.name}
          error={errors.description !== undefined}
          helperText={errors.description?.message}
        />
        <FormControl>
          <InputLabel>
            <Trans id="Category">Category</Trans>
          </InputLabel>
          <Select
            label={<Trans id="Category">Category</Trans>}
            name={category.field.name}
            value={category.field.value}
            onChange={category.field.onChange}
            onBlur={category.field.onBlur}
            inputRef={category.field.ref}
          >
            {categories.map((item) => (
              <MenuItem value={item} key={item}>
                <Trans id={item}>{item}</Trans>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
