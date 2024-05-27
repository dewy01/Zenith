import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateForm } from './CreateForm';
import { taskModel, taskSchema } from './schema';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { getGroup } from '~/api/Group/query';
import { GroupProjectTask } from '~/api/GroupProjectTask/api';
import {
  deleteGroupProjectTask,
  mutateEditGroupProjectTask,
} from '~/api/GroupProjectTask/query';
import { Trans } from '@lingui/react';

type Props = {
  task: GroupProjectTask;
};

export const DialogEdit = ({ task }: Props) => {
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
  useEffect(() => {
    const defaultUser = group.users.find((x) => x.username === task.user);
    if (defaultUser) taskForm.setValue('userId', defaultUser?.userID);
  }, [task]);

  const taskForm = useForm<taskModel>({
    defaultValues: {
      projectID: task.projectTaskID,
      title: task.title,
      description: task.description,
      userId: 0,
      status: task.status as
        | 'Backlog'
        | 'in Progress'
        | 'For Review'
        | undefined,
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
  const { mutateAsync } = mutateEditGroupProjectTask();
  const { mutateAsync: deleteTask } = deleteGroupProjectTask();

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
          <Trans id="Edit">Edit</Trans> {task.title}
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateForm
            onSubmit={handleSubmit}
            formContext={taskForm}
            users={group.users}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
            }}
          >
            <Trans id="Cancel">Cancel</Trans>
          </Button>
          <Button type="submit" form="createtaskForm" color="info" autoFocus>
            <Trans id="Edit">Edit</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
