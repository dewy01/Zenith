import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  projectId: number;
  onSubmit: () => void;
  mutateDelete: (projectId: number) => void;
};

export const ProjectDelete = ({ projectId, onSubmit, mutateDelete }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <DeleteIcon />
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
        <DialogTitle>Delete project?</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            Deleting this project means that all provided data and it's Tasks
            will be lost.
            <br />
            Are you sure?
          </Alert>
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
            color="error"
            onClick={() => {
              mutateDelete(projectId);
              handleClose();
              onSubmit();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
