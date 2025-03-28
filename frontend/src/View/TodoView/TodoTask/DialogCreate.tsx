import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  alpha,
} from '@mui/material';
import { todoModel, todoSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CreateForm } from './CreateForm';
import { mutateAddTodo } from '~/api/Todos/query';
import { Trans } from '@lingui/macro';

type Props = {
  color: string;
  projectId: number;
};

export const DialogCreate = ({ color, projectId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const todoForm = useForm<todoModel>({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: zodResolver(todoSchema),
  });

  const { mutateAsync } = mutateAddTodo();
  const handleSubmit = (data: todoModel) => {
    mutateAsync({
      projectTodoID: projectId,
      title: data.title,
      description: data.description ? data.description : '',
    });
    todoForm.reset();
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        fullWidth
        sx={(theme) => ({
          backgroundColor: alpha(color, 0.9),
          '&:hover': {
            backgroundColor: alpha(color, 0.5),
            boxShadow: 'none',
          },
          color: theme.palette.getContrastText(color),
        })}
      >
        <Trans id="Add new Task">Add new Task</Trans>
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
          <Trans id="Create Task">Create Task</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={todoForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans id="Cancel">Cancel</Trans>
          </Button>
          <Button type="submit" form="createTodoForm" color="success" autoFocus>
            <Trans id="Create">Create</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
