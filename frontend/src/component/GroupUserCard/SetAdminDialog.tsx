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
          <DialogContentText>
            <Alert severity="warning">
              Setting another user as admin will remove your current role.
              <br />
              Are you sure?
            </Alert>
            <FormControlLabel
              control={
                <Checkbox
                  color="warning"
                  checked={confirmed}
                  onChange={handleCheckboxChange}
                />
              }
              label="I'm sure"
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
            Cancel
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
            Grant
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
