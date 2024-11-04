import { zodResolver } from '@hookform/resolvers/zod';
import { Trans } from '@lingui/macro';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Project } from '~/api/Projects/api';
import { mutateEditProject } from '~/api/Projects/query';
import { CreateForm } from './CreateForm';
import { projectModel, projectSchema } from './schema';

type Props = {
  project: Project;
  onSubmit: () => void;
};

export const DialogEdit = ({ project, onSubmit }: Props) => {
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
      deadline: new Date(project.deadline),
      status: project.status,
    },
    resolver: zodResolver(projectSchema),
  });
  const { mutateAsync } = mutateEditProject();
  const handleSubmit = (data: projectModel) => {
    mutateAsync({
      projectID: project.projectID,
      data: {
        Title: data.title,
        Deadline: data.deadline,
        Status: data.status,
        Description: data.description ? data.description : '',
      },
    });
    projectForm.reset();
    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <EditIcon />
      </MenuItem>
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
          <Trans>Edit Project</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={projectForm} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
              onSubmit();
            }}
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button
            type="submit"
            form="createProjectForm"
            color="info"
            autoFocus
            onClick={onSubmit}
          >
            <Trans>Edit</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
