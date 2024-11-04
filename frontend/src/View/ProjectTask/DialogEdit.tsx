import { zodResolver } from '@hookform/resolvers/zod';
import { Trans } from '@lingui/macro';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectTask } from '~/api/Projects/api';
import {
  deleteProjectTask,
  mutateEditProjectTask,
} from '~/api/ProjectTask/query';
import { CreateForm } from './CreateForm';
import { taskModel, taskSchema } from './schema';

type Props = {
  task: ProjectTask;
};

export const DialogEdit = ({ task }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const taskForm = useForm<taskModel>({
    defaultValues: {
      projectID: task.projectTaskID,
      title: task.title,
      description: task.description,
      status: task.status,
      category: task.category as
        | 'Note'
        | 'Email'
        | 'Meeting'
        | 'Research'
        | 'Design'
        | 'Development'
        | 'Maintenance',
    },
    resolver: zodResolver(taskSchema),
  });
  const { mutateAsync } = mutateEditProjectTask();
  const { mutateAsync: deleteTask } = deleteProjectTask();

  const handleSubmit = (data: taskModel) => {
    mutateAsync({ projectTaskID: task.projectTaskID, data: data });
    taskForm.reset();
    handleClose();
  };

  const handleDelete = () => {
    deleteTask(task.projectTaskID);
    handleClose();
  };

  return (
    <>
      <Typography
        onClick={handleClickOpen}
        gutterBottom
        fontSize={20}
        component="div"
        sx={{
          '&:hover': {
            textDecoration: 'underline',
          },
          cursor: 'pointer',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {task.title}
      </Typography>
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
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Trans>Edit</Trans> {task.title}
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateForm onSubmit={handleSubmit} formContext={taskForm} />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
            }}
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button type="submit" form="createtaskForm" color="info" autoFocus>
            <Trans>Edit</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
