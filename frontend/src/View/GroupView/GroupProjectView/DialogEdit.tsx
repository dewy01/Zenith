import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { CreateForm } from './CreateForm';
import { groupProjectModel, groupProjectSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
import { mutateEditGroupProject } from '~/api/GroupProjects/query';
import { GroupProject } from '~/api/Group/api';

type Props = {
  project: GroupProject;
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

  const projectForm = useForm<groupProjectModel>({
    defaultValues: {
      title: project.title,
      description: project.description,
      deadline: new Date(project.deadline),
      status: project.status as 'on Hold' | 'in Progress' | 'Done' | undefined,
    },
    resolver: zodResolver(groupProjectSchema),
  });
  const { mutateAsync } = mutateEditGroupProject();
  const handleSubmit = (data: groupProjectModel) => {
    mutateAsync({
      projectID: project.groupProjectID,
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
        <DialogTitle>Edit project</DialogTitle>
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
            Cancel
          </Button>
          <Button
            type="submit"
            form="groupProjectForm"
            color="info"
            autoFocus
            onClick={onSubmit}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
