import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { mutateSetAdmin } from '~/api/Group/query';

type Props = {
  userId: number;
};

export const SetAdminDialog = ({ userId }: Props) => {
  const { mutateAsync: setAdmin } = mutateSetAdmin();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={'Grant admin'}>
        <IconButton onClick={handleClickOpen}>
          <VerifiedUserIcon />
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
        <DialogTitle>Grant admin?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Setting user as admin will remove your current role.
            <br />
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            color="warning"
            onClick={() => {
              setAdmin({ userId: userId });
              handleClose();
            }}
            autoFocus
          >
            Grant
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
