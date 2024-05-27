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
  Alert,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { mutateDeleteAccount } from '~/api/User/query';
import { Trans } from '@lingui/react';

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
        <DialogTitle>
          <Trans id=">Delete Account">Delete Account</Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alert severity="error">
              <Trans id="This action will remove your account and its whole data.">
                This action will remove your account and its whole data.
              </Trans>
              <br />
              <Trans id="Are you sure">Are you sure</Trans>?
            </Alert>
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                color="error"
                checked={confirmed}
                onChange={handleCheckboxChange}
              />
            }
            label={<Trans id="Im sure">Im sure</Trans>}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans id="Cancel">Cancel</Trans>
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
            <Trans id="Delete">Delete</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
