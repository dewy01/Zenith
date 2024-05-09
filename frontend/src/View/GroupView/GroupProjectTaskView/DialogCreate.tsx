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
import { CreateForm } from './CreateForm';
import { getGroup } from '~/api/Group/query';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { mutateAddGroupProjectTask } from '~/api/GroupProjectTask/query';

type Props = {
  projectId: number;
};

export const DialogCreate = ({ projectId }: Props) => {
  const { data: group, isLoading } = getGroup();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading || !group) {
    return <LoadingView />;
  }

  const taskForm = useForm<taskModel>({
    defaultValues: {
      projectID: projectId,
      title: '',
      description: '',
      userId: group.users[0].userID,
      status: 'Backlog',
      category: 'Note',
    },
    resolver: zodResolver(taskSchema),
  });
  const { mutateAsync } = mutateAddGroupProjectTask();
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
          <CreateForm
            formContext={taskForm}
            users={group.users}
            onSubmit={handleSubmit}
          />
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
