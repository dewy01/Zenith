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
        sx={{
          backgroundColor: alpha(color, 0.9),
          '&:hover': {
            backgroundColor: alpha(color, 0.5),
            boxShadow: 'none',
          },
        }}
      >
        Add new Task
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
        <DialogTitle>Create Todo</DialogTitle>
        <DialogContent>
          <CreateForm formContext={todoForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="createTodoForm" color="success" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
