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
import { Trans } from '@lingui/react';

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
        + <Trans id="Project Task">Project Task</Trans>
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
        <DialogTitle>
          <Trans id="Create Project Task">Create Project Task</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={taskForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans id="Cancel">Cancel</Trans>
          </Button>
          <Button type="submit" form="createtaskForm" color="success" autoFocus>
            <Trans id="Create">Create</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
