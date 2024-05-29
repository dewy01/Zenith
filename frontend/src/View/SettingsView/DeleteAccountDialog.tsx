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
import { Trans } from '@lingui/macro';

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
      <Tooltip title={<Trans>Delete account</Trans>}>
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
          <Trans>Delete Account</Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alert severity="error">
              <Trans>
                This action will remove your account and its whole data.
              </Trans>
              <br />
              <Trans>Are you sure </Trans>?
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
            label={<Trans>Im sure</Trans>}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans>Cancel</Trans>
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
            <Trans>Delete</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
