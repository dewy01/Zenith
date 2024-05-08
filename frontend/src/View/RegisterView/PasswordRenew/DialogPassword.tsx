import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { PasswordForm } from '.';
import { resetPasswordModel, resetPasswordSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mutateResetPassword } from '~/api/User/query';

export const DialogPassword = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetForm = useForm<resetPasswordModel>({
    defaultValues: {
      resetToken: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });
  const { mutateAsync: resetPassword } = mutateResetPassword();
  const handleResetPassword = (data: resetPasswordModel) => {
    resetPassword(data);
    resetForm.reset();
    handleClose();
  };

  return (
    <>
      <Tooltip title="Renew password" arrow>
        <IconButton onClick={handleClickOpen}>
          <AutorenewIcon />
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
        <DialogTitle>Renew password</DialogTitle>
        <DialogContent>
          <PasswordForm
            formContext={resetForm}
            onSubmit={handleResetPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="resetForm" color="success">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
