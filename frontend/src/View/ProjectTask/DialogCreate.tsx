import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskModel, taskSchema } from './schema';
import { mutateAddProjectTask } from '~/api/ProjectTask/query';
import { CreateForm } from './CreateForm';

type Props = {
  projectId: number;
};

export const DialogCreate = ({ projectId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskForm = useForm<taskModel>({
    defaultValues: {
      projectID: projectId,
      title: '',
      description: '',
      status: 'Backlog',
      category: 'Note',
    },
    resolver: zodResolver(taskSchema),
  });
  const { mutateAsync } = mutateAddProjectTask();
  const handleSubmit = (data: taskModel) => {
    mutateAsync(data);
    taskForm.reset();
    handleClose();
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        + Project Task
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
        <DialogTitle>Create project Task</DialogTitle>
        <DialogContent>
          <CreateForm formContext={taskForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="createtaskForm" color="success" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
