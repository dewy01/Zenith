import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getNoteFromToken, mutateEditNote } from '~/api/Notes/query';

type Props = {
  noteId: number;
};

export const DialogCopy = ({ noteId }: Props) => {
  const [token, setToken] = useState<string>('');
  const { mutateAsync } = mutateEditNote();
  const { data: note, refetch: getNote } = getNoteFromToken(token);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (note) {
      mutateAsync({
        noteId: noteId,
        note: {
          title: note.title,
          content: note.content,
        },
      });
    }
  }, [note]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  return (
    <>
      <Tooltip title="Copy from code">
        <IconButton onClick={handleClickOpen}>
          <ContentCopyIcon sx={{ height: 15, width: 15, color: 'darkgrey' }} />
        </IconButton>
      </Tooltip>
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
        <DialogTitle>Copy note</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <DialogContentText>
            Action will remove current note data
            <br />
            Are you sure?
          </DialogContentText>
          <TextField
            value={token}
            onChange={handleTokenChange}
            fullWidth
            label="Token"
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="info"
            onClick={() => {
              getNote();
              setToken('');
              handleClose();
            }}
            autoFocus
            disabled={token === ''}
          >
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
