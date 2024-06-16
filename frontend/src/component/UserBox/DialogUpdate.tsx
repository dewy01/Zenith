import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { userModel, userSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trans, t } from '@lingui/macro';
import { CreateForm } from './CreateForm';
import { MyAccount } from '~/api/User/api';
import { mutateUpdateAccount } from '~/api/User/query';
import { enqueueSnackbar } from 'notistack';

type Props = {
  user: MyAccount;
};

export const DialogUpdate = ({ user }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const form = useForm<userModel>({
    defaultValues: {
      username: user.username,
      email: user.email,
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync } = mutateUpdateAccount();
  const handleSubmit = (data: userModel) => {
    mutateAsync(data);
    if (form.getValues('email') !== user.email) {
      enqueueSnackbar(t({ message: 'Check email for verification link' }));
    }
    form.reset();
    handleClose();
  };

  return (
    <>
      <Tooltip title={t({ message: 'Edit account' })} placement="right">
        <Typography
          onClick={handleClickOpen}
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          <Trans>Account</Trans>
        </Typography>
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
          <Trans>Edit Account</Trans>
        </DialogTitle>
        <DialogContent>
          <CreateForm formContext={form} onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button type="submit" form="userForm" color="info" autoFocus>
            <Trans>Edit</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
