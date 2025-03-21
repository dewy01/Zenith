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
import { Trans } from '@lingui/macro';

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
        <DialogTitle>
          <Trans>Delete Todo</Trans>?
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <Trans>
              Deleting this Todo means that all provided data will be lost.
            </Trans>
            <br />
            <Trans>Are you sure</Trans>?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button
            color="error"
            onClick={() => {
              if (todoId !== undefined) mutateAsync(todoId);
              handleClose();
            }}
            autoFocus
          >
            <Trans>Delete</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
