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
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Trans } from '@lingui/macro';
import { mutateDeleteGroup } from '~/api/Group/query';

type Props = {
  groupId: number | null;
};

export const RemoveGroupDialog = ({ groupId }: Props) => {
  const { mutateAsync } = mutateDeleteGroup();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={<Trans>Remove group</Trans>}>
        <IconButton onClick={handleClickOpen}>
          <DoDisturbIcon />
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
          <Trans>Delete group</Trans>?
        </DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <Trans>
              Deleting this group means that all provided data will be lost.
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
              if (groupId !== null) mutateAsync(groupId);
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
