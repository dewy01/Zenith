import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getNoteFromToken } from '~/api/Notes/query';
import { queryClient } from '~/api/api';
import { Trans } from '@lingui/react';

export const DialogCopy = () => {
  const [token, setToken] = useState<string>('');
  const { data: isCopied, refetch: getNote } = getNoteFromToken(token);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isCopied) {
      queryClient.invalidateQueries({ queryKey: ['allNotes'] });
    }
  }, [isCopied]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  return (
    <>
      <Tooltip title={<Trans id="Copy from code">Copy from code</Trans>}>
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
        <DialogTitle>
          <Trans id="Copy note">Copy note</Trans>
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Alert severity="info">
            <Trans id="Action will create a new note">
              Action will create a new note
            </Trans>
          </Alert>
          <TextField
            value={token}
            onChange={handleTokenChange}
            fullWidth
            label={<Trans id="Token">Token</Trans>}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans id="Cancel">Cancel</Trans>
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
            <Trans id="Copy">Copy</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
