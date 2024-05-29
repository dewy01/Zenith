import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { mutateSetAdmin } from '~/api/Group/query';
import { Trans } from '@lingui/macro';

type Props = {
  userId: number;
};

export const SetAdminDialog = ({ userId }: Props) => {
  const { mutateAsync: setAdmin } = mutateSetAdmin();
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
      <Tooltip title={<Trans>Grant admin</Trans>}>
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
        <DialogTitle>
          <Trans>Grant admin</Trans>?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Alert severity="warning">
              <Trans>
                Setting another user as admin will remove your current role.
              </Trans>
              <br />
              <Trans>Are you sure</Trans>?
            </Alert>
            <FormControlLabel
              control={
                <Checkbox
                  color="warning"
                  checked={confirmed}
                  onChange={handleCheckboxChange}
                />
              }
              label={<Trans>Im sure</Trans>}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => {
              handleClose();
            }}
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button
            color="warning"
            onClick={() => {
              setAdmin({ userId: userId });
              handleClose();
            }}
            disabled={!confirmed}
            autoFocus
          >
            <Trans>Grant</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
