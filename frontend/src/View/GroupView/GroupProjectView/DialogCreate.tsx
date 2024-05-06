import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { CreateForm } from './CreateForm';
import { groupProjectModel, groupProjectSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mutateAddGroupProject } from '~/api/GroupProjects/query';

type Props = {
  groupId: number;
};

export const DialogCreate = ({ groupId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const projectForm = useForm<groupProjectModel>({
    defaultValues: {
      title: '',
      groupID: groupId,
      description: '',
      deadline: new Date(),
      status: 'on Hold',
    },
    resolver: zodResolver(groupProjectSchema),
  });
  const { mutateAsync } = mutateAddGroupProject();
  const handleSubmit = (data: groupProjectModel) => {
    mutateAsync(data);
    projectForm.reset();
    handleClose();
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        + project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogTitle>Create project</DialogTitle>
        <DialogContent>
          <CreateForm formContext={projectForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="groupProjectForm"
            color="success"
            autoFocus
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
