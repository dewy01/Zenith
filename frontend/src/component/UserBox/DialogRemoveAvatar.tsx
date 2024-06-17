import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Trans, t } from '@lingui/macro';
import { mutateDeleteImage } from '~/api/Image/query';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  initialImage: string | null;
};

export const DialogRemoveAvatar = ({ initialImage }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteImage } = mutateDeleteImage();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteImage(initialImage ?? '');
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={t({ message: 'Remove avatar' })} placement="right">
        <IconButton disabled={initialImage === null} onClick={handleClickOpen}>
          <DeleteIcon />
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
          <Trans>Remove Avatar</Trans>
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <Trans>Deleting avatar means that it will be forever lost.</Trans>
            <br />
            <Trans>Are you sure</Trans>?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            <Trans>Remove</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
