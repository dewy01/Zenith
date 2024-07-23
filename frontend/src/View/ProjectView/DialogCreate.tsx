import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { CreateForm } from './CreateForm';
import { projectModel, projectSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mutateAddProject } from '~/api/Projects/query';
import { Trans } from '@lingui/macro';
import { ProjectStatus } from '~/api/Projects/api';

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
      deadline: new Date(),
      status: ProjectStatus.InProgress,
    },
    resolver: zodResolver(projectSchema),
  });
  const { mutateAsync } = mutateAddProject();
  const handleSubmit = (data: projectModel) => {
    mutateAsync(data);
    projectForm.reset();
    handleClose();
  };

  return (
    <>
      <Button color="inherit" onClick={handleClickOpen}>
        + <Trans>Project</Trans>
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
          <Trans>Create Project</Trans>
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
            form="createProjectForm"
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
