import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { taskModel } from './schema';
import { UseFormReturn, useController } from 'react-hook-form';
import { GroupUser } from '~/api/Group/api';
import { stringAvatar } from '~/utils/userAvatar';
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
  users: GroupUser[];
};

export const CreateForm = ({ onSubmit, users, formContext }: Props) => {
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

  const userId = useController({
    control: control,
    name: 'userId',
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
                <Trans id="InProgress">In Progress</Trans>
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
        <Box display={'flex'} gap={1}>
          <FormControl sx={{ width: '240px' }}>
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
          <FormControl sx={{ width: '240px' }}>
            <InputLabel>
              <Trans id="User">User</Trans>
            </InputLabel>
            <Select
              label={<Trans id="User">User</Trans>}
              name={userId.field.name}
              value={userId.field.value}
              onChange={userId.field.onChange}
              onBlur={userId.field.onBlur}
              inputRef={userId.field.ref}
            >
              {users.map((item) => (
                <MenuItem value={item.userID} key={item.userID}>
                  <Box
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                    gap={2}
                  >
                    <Avatar {...stringAvatar(item.username)} />
                    {item.username}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
