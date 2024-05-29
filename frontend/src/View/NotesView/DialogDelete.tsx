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
import { deleteNote } from '~/api/Notes/query';
import { Trans } from '@lingui/macro';

type Props = {
  noteId: number | null;
};

export const DialogDelete = ({ noteId }: Props) => {
  const { mutateAsync } = deleteNote();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton disabled={noteId === null} onClick={handleClickOpen}>
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
          <Trans>Delete note</Trans>?
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <Trans>
              Deleting this note means that all provided data will be lost.
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
              if (noteId !== null) mutateAsync(noteId);
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
