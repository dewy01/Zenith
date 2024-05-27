import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CreateForm } from './CreateForm';
import { projectModel, projectSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
import { mutateEditProjectTodo } from '~/api/ProjectTodos/query';
import { ProjectTodo } from '~/api/ProjectTodos/api';
import { Trans } from '@lingui/react';

type Props = {
  project: ProjectTodo;
};

export const DialogEdit = ({ project }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const projectForm = useForm<projectModel>({
    defaultValues: {
      title: project.title,
      description: project.description,
      color: project.color,
    },
    resolver: zodResolver(projectSchema),
  });
  const { mutateAsync } = mutateEditProjectTodo();
  const handleSubmit = (data: projectModel) => {
    mutateAsync({ projectId: project.projectTodoID, project: data });
    projectForm.reset();
    handleClose();
  };

  useEffect(() => {
    if (project) {
      projectForm.reset({
        title: project.title || '',
        description: project.description || '',
        color: project.color || '',
      });
    }
  }, [project]);

  return (
    <>
      <IconButton
        sx={{
          width: '30px',
          height: '30px',
        }}
        onClick={handleClickOpen}
      >
        <EditIcon sx={{ width: '20px', height: '20px' }} />
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
          <Trans id="Create Todo">Create Todo</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={projectForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans id="Cancel">Cancel</Trans>
          </Button>
          <Button
            type="submit"
            form="createTodoProjectForm"
            color="info"
            autoFocus
          >
            <Trans id="Edit">Edit</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
