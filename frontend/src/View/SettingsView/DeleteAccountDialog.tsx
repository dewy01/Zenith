import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { mutateDeleteAccount } from '~/api/User/query';

export const DeleteAccountDialog = () => {
  const { mutateAsync: deleteAccount } = mutateDeleteAccount();
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setConfirmed(false);
    setOpen(false);
  };

  const handleCheckboxChange = (event: any) => {
    setConfirmed(event.target.checked);
  };

  return (
    <>
      <Tooltip title={'Delete account'}>
        <Button color="error" variant="contained" onClick={handleClickOpen}>
          <PersonRemoveIcon />
        </Button>
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
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will remove your account and its whole data.
            <br />
            Are you sure?
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox checked={confirmed} onChange={handleCheckboxChange} />
            }
            label="I'm sure"
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              deleteAccount();
              handleClose();
            }}
            disabled={!confirmed}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
