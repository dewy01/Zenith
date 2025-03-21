import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { CreateForm } from './CreateForm';
import { projectModel, projectSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import { mutateAddProjectTodo } from '~/api/ProjectTodos/query';
import { Trans } from '@lingui/macro';

export const DialogCreate = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const projectForm = useForm<projectModel>({
    defaultValues: {
      title: '',
      description: '',
      color: '#aabbcc',
    },
    resolver: zodResolver(projectSchema),
  });
  const { mutateAsync } = mutateAddProjectTodo();
  const handleSubmit = (data: projectModel) => {
    mutateAsync(data);
    projectForm.reset();
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
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
          <Trans>Create Todo</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={projectForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button
            type="submit"
            form="createTodoProjectForm"
            color="success"
            autoFocus
          >
            <Trans>Create</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
