import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProjectTodo } from '~/api/ProjectTodos/query';

type Props = {
  todoId: number | undefined;
};

export const DialogDelete = ({ todoId }: Props) => {
  const { mutateAsync } = deleteProjectTodo();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton disabled={todoId === undefined} onClick={handleClickOpen}>
        <DeleteIcon />
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
        <DialogTitle>Delete Todo?</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            Deleting this Todo means that all provided data will be lost.
            <br />
            Are you sure?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              if (todoId !== undefined) mutateAsync(todoId);
              handleClose();
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
